/* eslint-disable */
import UserMen from "../profile-general/UserMen";
import "../../../css/profile/generalDates/styles-component-generalDates.css";
import { FaRegEdit } from "react-icons/all";
import EditProfile from "./EditProfile.js";
import { useState, useEffect } from "react";
import { getGeneralInformationUser } from "../../../api/client/profile/generalInfo";
import Moment from "react-moment";
import LoadingBlock from "../../LoadingBlock";
export default function GeneralDates() {
  const [viewEdit, setViewEdit] = useState(false);
  const [information, setInformation] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getGeneralInformationUser();
      // console.log(response);
      setInformation(response);
    })();
  }, []);
  return (
    <>
      {information ? (
        <>
          <div className="item-edit">
            <h2></h2>
            <div onClick={() => setViewEdit(true)}>
              <FaRegEdit size={20} />
              <p>Editar</p>
            </div>
          </div>
          <h3>{information.email}</h3>
          <UserMen />
          <p className="information-item">Nombre</p>
          <p>{information.name}</p>
          <p className="information-item">Apellidos</p>
          <p>{information.last_name}</p>
          <p className="information-item">Telefono</p>
          <p>{information.phone}</p>
          <p className="information-item">Fecha de nacimiento</p>

          <p>
            <Moment format="DD/MM/YYYY">{information.birthday}</Moment>
          </p>
          {viewEdit && <EditProfile setViewEdit={setViewEdit} />}
        </>
      ) : (
        <LoadingBlock />
      )}
    </>
  );
}
