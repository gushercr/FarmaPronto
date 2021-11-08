import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { BiImageAdd, IoMdCloseCircle } from "react-icons/all";
import { useState } from "react";
import { addBrand } from "../../../api/admin/brands";
import LoadingFloat from "../../LoadingFloat";
const validationSchema = yup.object({
  name: yup.string().min(4).required(),
  img: yup.mixed().required(),
});
export default function AddBrand() {
  const [urlImg, set_urlImg] = useState("");
  const [image, setImageBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      img: [],
    },
    onSubmit: async (values) => {
      setLoading(true);
      const response = await addBrand(values, image);
      if (!response.errors) {
        setLoading(false);
        toast.success("Marca añadida");
        setTimeout(() => {
          window.location.replace("");
        }, 2500);
      } else {
        setLoading(false);
        toast.error("Revise sus datos");
      }
      console.log(response);
    },
    validationSchema: validationSchema,
  });
  const setImage = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      set_urlImg(URL.createObjectURL(e.target.files[0]));
      setImageBrand(e.target.files[0]);
    } else {
      formik.setFieldValue("img", []);
      toast.error("Ingrese una imagen con formato valido (PNG o JPEG)");
    }
  };
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
        <div style={{ width: "300px" }}>
          <div className="double-section">
            <div className="section-img-primary">
              <label>Imagen de la marca</label>
              <div className="container-double-img">
                {!formik.values.img.length > 0 ? (
                  <>
                    <BiImageAdd size={50} color="#cacaca" />
                    <input
                      type="file"
                      name="img"
                      id="img"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setImage(e);
                      }}
                      value={formik.values.img}
                      className={formik.errors.img && "input-error"}
                    />
                  </>
                ) : (
                  <>
                    <div className="preview-img">
                      <img src={urlImg} alt="" />
                      <IoMdCloseCircle
                        size={30}
                        color="red"
                        onClick={() => formik.setFieldValue("img", [])}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
