import "../../../css/profile/addresses/styles-component-item-address.css";
import { useState } from "react";
import {
  TiLocationOutline,
  CgChevronDoubleDownO,
  CgChevronDoubleUpO,
  FiMoreVertical,
} from "react-icons/all";
import { deleteAddress } from "../../../api/client/address/deleteAddress";
import { toast, ToastContainer } from "react-toastify";
import EditAddress from "./EditAddress";
export default function ItemAddress(props) {
  const [viewRefences, setViewRefences] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  // recuperar el prop enviado de la lista
  const { data } = props;
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-item-address">
        <div className="top">
          <p className="title">{data.title}</p>
          <div className="top-options">
            <FiMoreVertical size={20} />
            <div className="top-address-options">
              {/* <button>Elegir como predeterminado</button> */}
              <button onClick={() => setViewEdit(true)}>Editar</button>
              <button
                onClick={() => {
                  deleteAddress(data.id);
                  toast.success("Direccion eliminada");
                  setTimeout(() => {
                    window.location.replace("");
                  }, 2500);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <p>
          <span>Colonia:</span> {data.colony}
        </p>
        <p>
          <span>Calle:</span> {data.street}
        </p>
        <div className="HomeNum">
          <p>
            <span>NumInt#</span> {data.int_num ? data.int_num : "SN"}
          </p>
          <p>
            <span>NumExt#</span> {data.out_num ? data.out_num : "SN"}
          </p>
        </div>
        <div
          className={
            viewRefences
              ? "view-address-references"
              : "not-view-address-references"
          }
        >
          <p>
            <span>Referencias:</span> {data.reference}
          </p>
        </div>
        <div className="card-buttom">
          <button
            className="more-about-address"
            onClick={() => setViewRefences(!viewRefences)}
          >
            {viewRefences ? (
              <CgChevronDoubleUpO size={25} />
            ) : (
              <CgChevronDoubleDownO size={25} />
            )}
            <p>{viewRefences ? "Menos detalles" : "Mas detalles"}</p>
          </button>
          <div className="status-address">
            <p className="address-selected">Direccion predeterminada</p>
            <TiLocationOutline size={25} color="#103f6e" />
          </div>
        </div>
      </div>
      {viewEdit && <EditAddress setViewEdit={setViewEdit} data={data} />}
    </>
  );
}
