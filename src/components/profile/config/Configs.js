import "../../../css/profile/configs/styles-component-config.css";
import { MdSecurity, FaQuestionCircle } from "react-icons/all";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import ChangeQuestion from "./ChangeQuestion";
export default function Configs() {
  const [viewChangePassword, setViewChangePassword] = useState(false);
  const [viewChangeQuestion, setViewChangeQuestion] = useState(false);
  return (
    <>
      <h2>Configuraciones</h2>
      <br />
      <div
        className="item-configuration"
        onClick={() => setViewChangePassword(true)}
      >
        <MdSecurity size={30} />
        <div className="config-description">
          <p>Cambiar contraseña</p>
          <p className="description">
            Cambia tu contraseña actual por una nueva y mas segura
          </p>
        </div>
        <div className="selected"> </div>
      </div>
      <div
        className="item-configuration"
        onClick={() => setViewChangeQuestion(true)}
      >
        <FaQuestionCircle size={30} />
        <div className="config-description">
          <p>Cambiar pregunta de seguridad</p>
          <p className="description">
            Modifica tu pregunta de seguridad en caso de olvidar tu contraseña
          </p>
        </div>
        <div className="selected"> </div>
      </div>
      {viewChangePassword && (
        <ChangePassword setViewEdit={setViewChangePassword} />
      )}
      {viewChangeQuestion && (
        <ChangeQuestion setViewEdit={setViewChangeQuestion} />
      )}
    </>
  );
}
