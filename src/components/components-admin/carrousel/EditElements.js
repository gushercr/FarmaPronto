import React from "react";
import { useEffect, useState } from "react";
import { BiImageAdd, TiDelete } from "react-icons/all";
import { getElementsCarrousel } from "../../../api/admin/carrousel";
import LoadingBlock from "../../LoadingBlock";
import "../../../css/ccs-admin/styles-view-carrousel.css";
import AddElement from "./AddElement";
import { deleteImage } from "../../../api/admin/carrousel";
import LoadingFloat from "../../LoadingFloat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditElements() {
  const [elementsCarrusel, setElementsCarrusel] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [nexPosition, setNextPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const nextPositionCalc = (data) => {
    const availables = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].position !== index + 1) {
        availables.push({
          position: index + 1,
        });
      }
    }
    availables.length === 0
      ? setNextPosition([{ position: data.length + 1 }])
      : setNextPosition(availables);
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await getElementsCarrousel();
        setElementsCarrusel(data.result);
        nextPositionCalc(data.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const deleteElement = (id) => {
    const confirm = window.confirm("Estas seguro de eliminar este anuncio?");
    if (confirm) {
      setLoading(true);
      const response = deleteImage(id);
      if (!response.errors) {
        setLoading(false);
        toast.success("Anuncio eliminado");
        setTimeout(() => {
          window.location.replace("");
        }, 2500);
      } else {
        setLoading(false);
        toast.error("Error al eliminar el anuncio");
      }
    }
  };
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
      <div className="dashboard-container">
        {elementsCarrusel ? (
          <>
            {elementsCarrusel.length > 0 ? (
              <>
                <h3>Inserta y elimina los anuncios</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="btn-add"
                    onClick={() => setViewModal(true)}
                  >
                    Agregar anuncio
                    <BiImageAdd size={30} style={{ marginLeft: "2px" }} />
                  </button>
                </div>
                {elementsCarrusel.map((element) => {
                  return (
                    <div className="elements-carrousel-edit">
                      <p
                        style={{
                          marginRight: "5px",
                          fontWeight: "bold",
                          fontSize: "1.2em",
                        }}
                      >
                        {element.position}
                      </p>

                      <img height="150" src={element.img_url} alt="" />
                      <TiDelete
                        size={30}
                        onClick={() => {
                          deleteElement(element.id);
                        }}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h2>Carrusel vacio!</h2>
                <p>
                  Dirigete a la seccion de Carrusel/editar para agregar nuevos
                  anuncios para tus clientes ;)
                </p>
              </>
            )}
          </>
        ) : (
          <LoadingBlock />
        )}
      </div>
      {elementsCarrusel && (
        <>
          {viewModal && (
            <AddElement setViewModal={setViewModal} nexPosition={nexPosition} />
          )}
        </>
      )}
      {loading && <LoadingFloat />}
    </>
  );
}
