/* eslint-disable */
import "../../../css/profile/generalDates/styles.component-editProfile.css";
import { useRef, useEffect } from "react";
import { GrClose } from "react-icons/all";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateInfoGeneral } from "../../../api/client/profile/updateInfo";
import { toast, ToastContainer } from "react-toastify";
import {} from "moment";
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
  tel: yup
    .string()
    .min(10)
    .max(10)
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required(),
  birthday: yup
    .date()
    .required()
    .test("age", "Necesitas ser mayor de edad", function (birthdate) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return birthdate <= cutoff;
    }),
});
export default function EditProfile(props) {
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
      name: "",
      lastname: "",
      tel: "",
      birthday: "",
    },
    onSubmit: async (values) => {
      const response = await updateInfoGeneral(values);
      if (!response.errors) {
        toast.success("Cambios guardados");
        localStorage.setItem("userName", formik.values.name);
        setTimeout(() => {
          window.location.replace("");
        }, 2500);
      } else {
        toast.error("Revise sus datos");
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
          <h3>Ingresa tus datos</h3>

          <p>Nombre</p>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={formik.errors.name && "input-error"}
          />
          <p>Apellidos</p>
          <input
            type="text"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            className={formik.errors.lastname && "input-error"}
          />
          <p>Telefono</p>
          <input
            type="text"
            name="tel"
            onChange={formik.handleChange}
            value={formik.values.tel}
            className={formik.errors.tel && "input-error"}
          />

          <p>Fecha de nacimiento</p>
          <input
            type="date"
            name="birthday"
            onChange={formik.handleChange}
            className={formik.errors.birthday && "input-error"}
          />
          {formik.errors.birthday}
          <div className="buttons">
            <form onSubmit={formik.handleSubmit}>
              <button type="submit" className="btn-success">
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
