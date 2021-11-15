/* eslint-disable */

import { useRef, useEffect, useState } from "react";
import { GrClose, BiImageAdd, TiDelete } from "react-icons/all";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addImage } from "../../../api/admin/carrousel";
import LoadingFloat from "../../LoadingFloat";
export default function AddElement(props) {
  const { setViewModal, nexPosition } = props;
  const divElement = useRef(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (divElement.current && !divElement.current.contains(event.target)) {
        setViewModal(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divElement]);
  const insertElement = async () => {
    setLoading(true);

    const response = await addImage(image[0], nexPosition[0].position);
    if (!response.errors) {
      setLoading(false);
      toast.success("Anuncio añadido");
      setTimeout(() => {
        window.location.replace("");
      }, 2500);
    } else {
      setLoading(false);
      toast.error("Revise sus datos");
    }
  };
  return (
    <>
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
              onClick={() => setViewModal(false)}
            />
          </div>
          <h3>Agregar anuncio</h3>
          <p style={{ textAlign: "center" }}>
            Ingrese una imagen que tenga como dimensiones 1200 x 500
          </p>
          <div className="container-double-img">
            {image.length > 0 ? (
              <>
                <img
                  src={URL.createObjectURL(image[0])}
                  width="100%"
                  height="auto"
                  alt=""
                />
                <TiDelete
                  size={30}
                  color="red"
                  style={{ display: "block", margin: "0px auto" }}
                  onClick={() => setImage([])}
                />
              </>
            ) : (
              <>
                <BiImageAdd
                  size={50}
                  color="#cacaca"
                  onClick={() => {
                    document.getElementById("img").click();
                  }}
                />
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "image/jpeg" ||
                      e.target.files[0].type === "image/png"
                    ) {
                      setImage(e.target.files);
                    } else {
                      toast.error("Inserte una imagen en formato valido");
                    }
                  }}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className="buttons">
            <button
              className="btn-success"
              onClick={() => insertElement()}
              disabled={image.length > 0 ? false : true}
            >
              Insertar
            </button>

            <button className="btn-cancel" onClick={() => setViewModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      {loading && <LoadingFloat />}
    </>
  );
}
