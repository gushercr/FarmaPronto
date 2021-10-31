/* eslint-disable */
import "../../css/login/styles-component-login.css";
import { useRef, useEffect } from "react";
import { GrClose } from "react-icons/all";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setToken } from "../../utils/useLocalStorage/useLocalForLogin";
import { authUser } from "../../api/client/auth/login";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export default function Login(props) {
  const { setViewLogin } = props;
  const divElement = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (divElement.current && !divElement.current.contains(event.target)) {
        setViewLogin(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divElement]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await authUser(values);
      if (response.errors) {
        toast.error("Datos incorrectos :(");
      } else {
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
    <div className="container-login">
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
      <div className="login" ref={divElement}>
        <div className="btn-close">
          <GrClose
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => setViewLogin(false)}
          />
        </div>
        <h3>Inicia sesion</h3>
        <p onClick={() => click()}>Correo electronico</p>
        <input
          type="email"
          name="email"
          placeholder="email@domain.com.mx"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={formik.errors.email && "input-error"}
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
            <button className="btn-success" type="submit">
              Iniciar
            </button>
          </form>
          <button className="btn-cancel" onClick={() => setViewLogin(false)}>
            Cancelar
          </button>
        </div>
        <a href="/register">Aun no tienes una cuenta?, registrate aqui</a>
      </div>
    </div>
  );
}
