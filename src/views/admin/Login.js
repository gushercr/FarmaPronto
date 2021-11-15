import "../../css/ccs-admin/styles-view-login.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authUserAdmin } from "../../api/admin/authUser";
import { setToken } from "../../utils/useLocalStorage/useLocalForLoginAdmin";
import { useState } from "react";
import LoadingFloat from "../../components/LoadingFloat";
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export default function Login() {
  const [loading, setLoading] = useState(false);
  function userAuthAdmin() {
    const token = localStorage.getItem("adminToken");
    if (token && token !== "") {
      return true;
    } else {
      return false;
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const response = await authUserAdmin(values);
      if (response.errors) {
        toast.error("Datos incorrectos :(");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Inicio de sesion correcta");
        setToken(response.token, response.user.name);
        setTimeout(() => {
          window.location.replace("");
        }, 2500);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      {userAuthAdmin() && <Redirect to="/typeUser/admin/dashboard" />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-login">
        <div className="login">
          <h3>Inicia sesion</h3>
          <p>Correo electronico</p>
          <input
            type="email"
            name="email"
            placeholder="email@domain.com.mx"
            onChange={formik.handleChange}
            className={formik.errors.email && "input-error"}
            value={formik.values.email}
          />
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            placeholder="*****"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={formik.errors.password && "input-error"}
          />

          <div className="buttons">
            <form onSubmit={formik.handleSubmit}>
              <button className="btn-success">Iniciar</button>
            </form>
            <button className="btn-cancel">Cancelar</button>
          </div>

          <a href="/register">Olvide mi contraseña</a>
        </div>
      </div>
      {loading && <LoadingFloat />}
    </>
  );
}
