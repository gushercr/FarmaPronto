import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { getElementsCarrousel } from "../../../api/admin/carrousel";
import LoadingBlock from "../../LoadingBlock";
export default function ListElementsCarrousel() {
  const [elementsCarrusel, setElementsCarrusel] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getElementsCarrousel();
        setElementsCarrusel(data.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="dashboard-container">
      {elementsCarrusel ? (
        <>
          {elementsCarrusel.length > 0 ? (
            <>
              <h1>Vista previa del carrusel</h1>
              <Carousel autoPlay showThumbs={false}>
                {elementsCarrusel.map((image) => {
                  return (
                    <div>
                      <img alt="" src={image.img_url} />
                    </div>
                  );
                })}
              </Carousel>
              <h3>Lista de anuncios</h3>
              <div style={{ display: "flex", marginBottom: "50px" }}>
                {elementsCarrusel.map((image) => {
                  return (
                    <img
                      alt=""
                      src={image.img_url}
                      height="150px"
                      style={{ marginRight: "15px" }}
                    />
                  );
                })}
              </div>
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
  );
}
