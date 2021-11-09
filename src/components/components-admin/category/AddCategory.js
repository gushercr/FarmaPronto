import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { addCategory } from "../../../api/admin/categorys";
import LoadingFloat from "../../LoadingFloat";
import { useHistory } from "react-router-dom";
const validationSchema = yup.object({
  name: yup.string().min(4).required(),
});
export default function EditCategory() {
  // recepcion de parametros
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const response = await addCategory(values);
      if (!response.errors) {
        setLoading(false);
        toast.success("Categoria añadida");
        setTimeout(() => {
          history.goBack();
        }, 2500);
      } else {
        setLoading(false);
        toast.error("Revise sus datos");
      }
      // console.log(response);
      //   console.log(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      {loading && <LoadingFloat />}
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
      <div className="dashboard-container">
        <h2>
          Ingresa los datos
          <form onSubmit={formik.handleSubmit}>
            <button type="submit">Guardar</button>
          </form>
        </h2>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Agrega el nombre de la marca"
          name="name"
          value={formik.values.name}
          onChange={(e) => formik.handleChange(e)}
          className={formik.errors.name && "input-error"}
        />
      </div>
    </>
  );
}
