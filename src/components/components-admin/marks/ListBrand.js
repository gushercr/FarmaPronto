import { TiEdit } from "react-icons/all";
import { useEffect, useState } from "react";
import { getBrands } from "../../../api/admin/brands";
export default function ListBrand() {
  const [dataBrands, setData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getBrands();
        setData(data.result);
        console.log(data.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="dashboard-container">
      <h2>Marcas</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input type="text" placeholder="Buscar marca" />
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>imagen</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {dataBrands && (
            <>
              {dataBrands.length > 0 ? (
                <>
                  {dataBrands.map((brand) => {
                    return (
                      <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
                        <td>
                          <img
                            src={brand.img_url}
                            alt={brand.name}
                            height="50px"
                          />
                        </td>
                        <td>
                          <TiEdit size={30} style={{ cursor: "pointer" }} />
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                "No hay marcas"
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
