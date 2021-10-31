import NotAddress from "./NotAddress";
import { MdAddLocation } from "react-icons/all";
import ItemAddress from "../address/ItemAddress";
import "../../../css/profile/addresses/styles-component-addresses.css";
import AddAddress from "../address/AddAddress";
import { getListAddresses } from "../../../api/client/address/listAddresses";
import { useState, useEffect } from "react";
import LoadingBlock from "../../LoadingBlock";
export default function Adresses() {
  const [viewAddAddress, setViewAddAddress] = useState(false);
  const [addresses, setAddresses] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getListAddresses();
      setAddresses(response.result);
    })();
  }, []);
  return (
    <>
      <h2>Mis direcciones</h2>
      <div className="addAddress">
        <button
          className="btn-addAddress"
          onClick={() => setViewAddAddress(true)}
        >
          Agregar direccion{" "}
          <MdAddLocation size={30} className="address-icon-add" />
        </button>
      </div>
      {addresses ? (
        <>
          {addresses.length !== 0 ? (
            <>
              {addresses.map((address) => {
                return <ItemAddress key={address.id} data={address} />;
              })}
            </>
          ) : (
            <NotAddress />
          )}
        </>
      ) : (
        <LoadingBlock />
      )}

      {viewAddAddress && <AddAddress setViewEdit={setViewAddAddress} />}
    </>
  );
}
