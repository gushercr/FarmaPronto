/* eslint-disable */
import { useRef, useEffect, useState } from "react";
import { GrClose } from "react-icons/all";
import { API_KEY_COPOMEX } from "../../../utils/apiCodePostal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { addAddress } from "../../../api/client/address/addAddress";
const validationSchema = yup.object({
  title: yup.string().min(4).required(),
  colony: yup
    .string()
    .min(4)
    .required()
    .matches(/^[aA-zZ\s]+$/),
  street: yup
    .string()
    .min(4)
    .required()
    .matches(/^[aA-zZ\s]+$/),
  int_num: yup.string().required(),
  out_num: yup
    .string()

    .required(),
  reference: yup.string().min(4),
});
export default function AddAddress(props) {
  const { setViewEdit } = props;
  const divElement = useRef(null);
  const [colonias, setColonias] = useState(null);
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
  useEffect(async () => {
    const response = await fetch(
      `https://api.copomex.com/query/get_colonia_por_cp/43000?token=${API_KEY_COPOMEX}`
    );
    const result = await response.json();
    setColonias(result.response.colonia);
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      colony: "",
      street: "",
      int_num: 0,
      out_num: 0,
      reference: "",
    },
    onSubmit: async (values) => {
      const response = await addAddress(values);
      if (!response.errors) {
        toast.success("Direccion añadida");
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
          <h3>Agregue una direccion</h3>

          <p>Titulo</p>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={formik.errors.title && "input-error"}
          />
          <p>Colonia</p>
          <select
            name="colony"
            value={formik.values.colony}
            onChange={formik.handleChange}
            className={formik.errors.colony && "input-error"}
          >
            <option disabled selected defaultValue="Seleccione"></option>
            {colonias &&
              colonias.map((colonia) => {
                return <option key={colonia}>{colonia}</option>;
              })}
          </select>
          <p>Calle</p>
          <input
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            className={formik.errors.street && "input-error"}
          />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              width: "75%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>Num int</p>

              <input
                type="number"
                name="int_num"
                value={formik.values.int_num}
                onChange={formik.handleChange}
                className={formik.errors.int_num && "input-error"}
              />
            </div>
            <div>
              <p>Num ext</p>
              <input
                type="number"
                name="out_num"
                value={formik.values.out_num}
                onChange={formik.handleChange}
                className={formik.errors.out_num && "input-error"}
              />
            </div>
          </div>
          <p>Referencias (Opcional)</p>
          <textarea
            name="reference"
            value={formik.values.reference}
            onChange={formik.handleChange}
            className={formik.errors.reference && "input-error"}
          />

          <div className="buttons">
            <form onSubmit={formik.handleSubmit}>
              <button className="btn-success">Guardar</button>
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
