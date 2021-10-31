/* eslint-disable */
import { useRef, useEffect } from "react";
import { GrClose } from "react-icons/all";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { changePassword } from "../../../api/client/profile/updateInfo";
const validationSchema = yup.object({
  password: yup.string().min(4).required(),
  newpassword: yup
    .string()
    .min(4)
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newpassword")], true),
});
export default function ChangePassword(props) {
  const { setViewEdit } = props;
  const divElement = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (divElement.current && !divElement.current.contains(event.target)) {
        setViewEdit(false);
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
      password: "",
      newpassword: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      const response = await changePassword(values);
      if (response.errors) {
        toast.error("Revise los datos");
      } else {
        toast.success("Cambios guardados");
        setTimeout(() => {
          window.location.replace("");
        }, 2500);
      }
    },
    validationSchema: validationSchema,
  });
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
      <div className="container-modify">
        <div className="container-edit" ref={divElement}>
          <div className="btn-close">
            <GrClose
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => setViewEdit(false)}
            />
          </div>
          <h3>Ingrese los datos</h3>

          <p>Contraseña actual</p>
          <input
            type="password"
            name="password"
            x
            value={formik.values.password}
            onChange={formik.handleChange}
            className={formik.errors.password && "input-error"}
          />
          <p>Nueva contraseña</p>
          <input
            type="password"
            name="newpassword"
            value={formik.values.newpassword}
            onChange={formik.handleChange}
            className={formik.errors.newpassword && "input-error"}
          />
          <p>Confirmar contraseña</p>
          <input
            type="password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            className={formik.errors.repeatPassword && "input-error"}
          />

          <div className="buttons">
            <form onSubmit={formik.handleSubmit}>
              <button className="btn-success" type="submit">
                Guardar
              </button>
            </form>
            <button className="btn-cancel" onClick={() => setViewEdit(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
