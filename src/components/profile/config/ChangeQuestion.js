/* eslint-disable */
import { useRef, useEffect } from "react";
import { GrClose } from "react-icons/all";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateQuestion } from "../../../api/client/profile/updateInfo";
import { toast, ToastContainer } from "react-toastify";
const validationSchema = yup.object({
  question: yup.string().required(),
  answer: yup.string().min(4).required(),
});
export default function ChangeQuestion(props) {
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
      question: "",
      answer: "",
    },
    onSubmit: async (values) => {
      const response = await updateQuestion(values);
      if (!response.errors) {
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
          <p>Selecciona una pregunta</p>
          <select
            name="question"
            onChange={formik.handleChange}
            value={formik.values.question}
            className={formik.errors.question && "input-error"}
          >
            <option disabled selected defaultValue=""></option>
            <option value="¿Nombre de mi primera mascota?">
              ¿Nombre de mi primera mascota?
            </option>
            <option value="¿Color favorito?">¿Color favorito?</option>
            <option value="¿Cancion favorita?">¿Cancion favorita?</option>
            <option value="¿Fecha de aniversario?">
              ¿Fecha de aniversario?
            </option>
            <option value="¿Comida favorita?">¿Comida favorita?</option>
          </select>
          <p>Respuesta</p>
          <input
            type="text"
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            className={formik.errors.answer && "input-error"}
          />

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
