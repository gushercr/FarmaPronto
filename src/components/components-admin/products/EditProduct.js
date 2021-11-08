import "../../../css/ccs-admin/product/styles-component-addProduct.css";
import { BiImageAdd, IoMdCloseCircle } from "react-icons/all";
import { useState, useEffect } from "react";
import { getListBrands } from "../../../api/client/brand/listBrand";
import { getListCategorys } from "../../../api/client/category/listCategorys";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { editProduct, changePublished } from "../../../api/admin/products";
import { useParams, useLocation, useHistory } from "react-router-dom";
import LoadingFloat from "../../LoadingFloat";
const validationSchema = yup.object({
  title: yup.string().min(4).required(),
  description: yup.string().min(4).required(),
  category: yup.string().min(4).required(),
  brand: yup.string().min(4).required(),
  stock: yup.number().required(),
  price: yup.number().required(),
  discount: yup.number().required(),
  main_img: yup.mixed().required(),
  detail_img: yup.mixed().required(),
});
export default function EditProduct() {
  const { id } = useParams();
  const params = useLocation();
  const { state } = params;
  const history = useHistory();

  const [dataBrands, setDataBrands] = useState(null);
  const [dataCategorys, setDataCategorys] = useState(null);
  const [url_main_img, set_urlMain_img] = useState(state.main_img);
  const [url_detailimg, SetUrl_detailimg] = useState(
    state.detail_img.length > 0 ? state.detail_img[0].url : ""
  );
  const [main_img, Setmain_img] = useState([]);
  const [detailsimg, setDetailsimg] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const dataBrands = await getListBrands();
        const dataCategorys = await getListCategorys();
        setDataBrands(dataBrands.result);
        setDataCategorys(dataCategorys.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: state.title,
      description: state.description,
      category: state.category,
      brand: state.brand,
      stock: state.stock,
      price: state.price,
      discount: state.discount,
      main_img: state.main_img,
      detail_img: state.detail_img,
      //   verificacion de cambios en las imagenes para enviar url
      img_main_edit: false,
      img_detail_edit: false,
      //   url's actuales
      url_main_img: state.main_img,
      url_detail_img:
        state.detail_img.length > 0 ? state.detail_img[0].url : "",
      // id de imagen
      imgId: state.detail_img.length > 0 ? state.detail_img[0].imgId : " ",
    },

    onSubmit: async (values) => {
      setLoading(true);
      const response = await editProduct(id, values, main_img, detailsimg);
      if (!response.errors) {
        setLoading(false);
        toast.success("Cambios guardados");
        setTimeout(() => {
          history.goBack();
        }, 2500);
      } else {
        setLoading(false);
        toast.error("Revise sus datos");
      }
      // console.log(response);
    },
    validationSchema: validationSchema,
  });

  const setImage = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      set_urlMain_img(URL.createObjectURL(e.target.files[0]));
      Setmain_img(e.target.files[0]);
      formik.setFieldValue("img_main_edit", true);
    } else {
      formik.setFieldValue("main_img", []);
      toast.error("Ingrese una imagen con formato valido (PNG o JPEG)");
    }
  };
  const setImageDeatails = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      SetUrl_detailimg(URL.createObjectURL(e.target.files[0]));
      setDetailsimg(e.target.files[0]);
      formik.setFieldValue("img_detail_edit", true);
    } else {
      formik.setFieldValue("detail_img", []);
      toast.error("Ingrese una imagen con formato valido (PNG o JPEG)");
    }
  };
  const changepublished = async () => {
    const response = await changePublished(id);
    if (!response.errors) {
      toast.success("Cambios guardados");
      setTimeout(() => {
        history.goBack();
      }, 2500);
    }
  };

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
      {loading && <LoadingFloat />}
      <div className="dashboard-container">
        <h2>
          Ingresa los datos
          <div style={{ display: "flex", alignItems: "center" }}>
            <form
              onSubmit={formik.handleSubmit}
              style={{ margin: 0, display: "flex" }}
            >
              <button type="submit">Guardar</button>
            </form>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => changepublished()}
            >
              {state.published ? "Despublicar" : "Publicar"}
            </button>
          </div>
        </h2>
        <div className="double-section">
          <div>
            <label>Titulo</label>
            <input
              type="text"
              placeholder="Agrega un titulo"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className={formik.errors.title && "input-error"}
            />
            <label>Categoria</label>
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              className={formik.errors.category && "input-error"}
            >
              <option disabled selected defaultValue="Seleccione">
                Seleccione
              </option>
              {dataCategorys &&
                dataCategorys.map((category) => {
                  return (
                    <option value={category.name} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
            <label>Marca</label>
            <select
              name="brand"
              onChange={formik.handleChange}
              value={formik.values.brand}
              className={formik.errors.brand && "input-error"}
            >
              <option disabled selected defaultValue="Seleccione">
                Seleccione
              </option>
              {dataBrands &&
                dataBrands.map((brands) => {
                  return (
                    <option value={brands.name} key={brands.id}>
                      {brands.name}
                    </option>
                  );
                })}
            </select>
            <label>Descripcion</label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Ingrese una descripcion del producto (Maximo 200 caracteres)"
              className={formik.errors.description && "input-error"}
            ></textarea>
          </div>
          <div className="section-quantity">
            <label>Cantidad disponible</label>
            <input
              type="number"
              placeholder="Cantidad"
              name="stock"
              onChange={formik.handleChange}
              value={formik.values.stock}
              className={formik.errors.stock && "input-error"}
            />
            <label>Precio</label>
            <input
              type="number"
              placeholder="Cantidad"
              name="price"
              className={formik.errors.price && "input-error"}
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <label>Descuento</label>
            <input
              type="number"
              placeholder="Cantidad"
              name="discount"
              className={formik.errors.discount && "input-error"}
              onChange={formik.handleChange}
              value={formik.values.discount}
            />
          </div>
        </div>
        <div className="double-section">
          <div className="section-img-primary">
            <label>Imagen principal</label>
            <div className="container-double-img">
              {!formik.values.main_img.length > 0 ? (
                <>
                  <BiImageAdd size={50} color="#cacaca" />
                  <input
                    type="file"
                    name="main_img"
                    id="main_img"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setImage(e);
                    }}
                    value={formik.values.main_img}
                    className={formik.errors.main_img && "input-error"}
                  />
                </>
              ) : (
                <>
                  <div className="preview-img">
                    <img src={url_main_img} alt="" />
                    <IoMdCloseCircle
                      size={30}
                      color="red"
                      onClick={() => {
                        formik.setFieldValue("main_img", []);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="section-img-details">
            <label>Imagenes detalles</label>
            <div className="container-double-img">
              {!formik.values.detail_img.length > 0 ? (
                <>
                  <BiImageAdd size={50} color="#cacaca" />
                  <input
                    type="file"
                    name="detail_img"
                    id="detail_img"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setImageDeatails(e);
                    }}
                    value={formik.values.detail_img}
                    className={formik.errors.detail_img && "input-error"}
                  />
                </>
              ) : (
                <>
                  <div className="preview-img">
                    <img src={url_detailimg} alt="detail_img" />
                    <IoMdCloseCircle
                      size={30}
                      color="red"
                      onClick={() => {
                        formik.setFieldValue("detail_img", []);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
