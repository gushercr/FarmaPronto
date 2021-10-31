/* eslint-disable */
import "../../css/login/styles-view-register.css";
import ImagenRegistro from "../../assets/fondo-registro.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/all";
import { useFormik } from "formik";
import * as yup from "yup";
import { authRegister } from "../../api/client/auth/register";
import { setToken } from "../../utils/useLocalStorage/useLocalForLogin";
const validationSchema = yup.object({
  name: yup
    .string()
    .min(4)
    .required()
    .matches(/^[aA-zZ\s]+$/),
  lastname: yup
    .string()
    .min(4)
    .required()
    .matches(/^[aA-zZ\s]+$/),
  email: yup.string().email().required(),
  tel: yup
    .string()
    .min(10)
    .max(10)
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});
export default function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const response = await authRegister(values);
      console.log(response);
      if (!response.errors) {
        toast.success("Inicio de sesion correcta");
        setToken(response.token, response.user.name);
        setTimeout(() => {
          window.location.replace("/");
        }, 2500);
      } else {
        response.errors.map((erroritem) => {
          toast.error(erroritem.msg);
        });
      }
    },
    validationSchema: validationSchema,
  });
  return (
    <>
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
      <div className="container-register">
        <img src={ImagenRegistro} alt="fondo registro" />
        <div className="register-form">
          <h1>Registrate</h1>
          <span className="register-span">
            Unete y disfruta de nuestros servicios
          </span>

          <form onSubmit={formik.handleSubmit}>
            <div className="register-double-input">
              <div className="register-double-input-item" id="item-name">
                <p>Nombre</p>
                <input
                  name="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={formik.errors.name && "input-error"}
                />
                {formik.values.name.length > 1 ? (
                  formik.errors.name ? (
                    <AiOutlineCloseCircle size={18} color="red" />
                  ) : (
                    <AiOutlineCheckCircle size={18} color="green" />
                  )
                ) : null}
                {/* <span className="instruccions">
                El nombre debe tener al menos 4 letras
              </span> */}
              </div>
              <div className="register-double-input-item">
                <p>Apellidos</p>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Ingresa tus apellidos"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  className={formik.errors.lastname && "input-error"}
                />
                {formik.values.lastname.length > 1 ? (
                  formik.errors.lastname ? (
                    <AiOutlineCloseCircle size={18} color="red" />
                  ) : (
                    <AiOutlineCheckCircle size={18} color="green" />
                  )
                ) : null}
              </div>
            </div>
            <div className="register-input">
              <p>Correo electronico</p>
              <input
                name="email"
                type="email"
                placeholder="Ingresa tu e-mail"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={formik.errors.email && "input-error"}
              />
              {formik.values.email.length > 1 ? (
                formik.errors.email ? (
                  <AiOutlineCloseCircle size={18} color="red" />
                ) : (
                  <AiOutlineCheckCircle size={18} color="green" />
                )
              ) : null}
            </div>
            <div className="register-input" id="item-tel">
              <p>Numero de telefono</p>
              <input
                name="tel"
                type="text"
                placeholder="Ingresa tu numero de telefono"
                onChange={formik.handleChange}
                value={formik.values.tel}
                className={formik.errors.tel && "input-error"}
              />
              {formik.values.tel.length > 1 ? (
                formik.errors.tel ? (
                  <AiOutlineCloseCircle size={18} color="red" />
                ) : (
                  <AiOutlineCheckCircle size={18} color="green" />
                )
              ) : null}
              {/* <span className="instruccions">
              El numero de telefono debe tener 10 digitos
            </span> */}
            </div>
            <div className="register-double-input">
              <div className="register-double-input-item" id="item-password">
                <p>Contraseña</p>
                <input
                  name="password"
                  type="text"
                  placeholder="Ingresa una contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={formik.errors.password && "input-error"}
                />
                {/* <span className="instruccions">
                La contraseña debe tener al menos una letra mayuscula,
                minuscula, un numero y al menos un caracter especial
              </span> */}
                {formik.values.password.length > 1 ? (
                  formik.errors.password ? (
                    <AiOutlineCloseCircle size={18} color="red" />
                  ) : (
                    <AiOutlineCheckCircle size={18} color="green" />
                  )
                ) : null}
              </div>
              <div className="register-double-input-item">
                <p>Confirmar</p>
                <input
                  name="confirmPassword"
                  type="text"
                  placeholder="Confirma tu contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className={formik.errors.confirmPassword && "input-error"}
                />
                {formik.values.confirmPassword.length > 1 ? (
                  formik.errors.confirmPassword ? (
                    <AiOutlineCloseCircle size={18} color="red" />
                  ) : (
                    <AiOutlineCheckCircle size={18} color="green" />
                  )
                ) : null}
              </div>
            </div>
            <div className="register-buttons">
              <button type="submit" className="btn-access">
                Registrar
              </button>
              <button className="btn-cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
