import "../../css/ccs-admin/styles-view-login.css";
export default function Login() {
  return (
    <div className="container-login">
      <div className="login">
        <h3>Inicia sesion</h3>
        <p>Correo electronico</p>
        <input type="text" />
        <p>Contraseña</p>
        <input type="password" />

        <div className="buttons">
          <button className="btn-success">Iniciar</button>
          <button className="btn-cancel">Cancelar</button>
        </div>

        <a href="/register">Olvide mi contraseña</a>
      </div>
    </div>
  );
}
