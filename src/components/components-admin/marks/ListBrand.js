import { useEffect, useState } from "react";
import { getBrands } from "../../../api/admin/brands";
import LoadingBlock from "../../LoadingBlock";
import { Link } from "react-router-dom";
import { TiEdit, GrFormClose } from "react-icons/all";

export default function ListBrand() {
  const [dataBrands, setData] = useState(null);
  const path = "/typeUser/admin/dashboard/editBrand/";
  const [search, setSearch] = useState(null);
  const [querySearch, setQuerySearch] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const data = await getBrands();
        setData(data.result);
        // console.log(data.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const searchquery = () => {
    const query = querySearch.replace(
      querySearch.substr(0, 1),
      querySearch.substr(0, 1).toUpperCase()
    );
    query.charAt(0).toUpperCase();
    if (query.length > 3) {
      const result = dataBrands.filter((element) => {
        return element.name.includes(query);
      });
      setSearch(result);
    }
    if (query.length === 1) {
      setSearch(null);
    }
  };
  return (
    <div className="dashboard-container">
      <h2>Marcas</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Buscar producto"
          onChange={(e) => {
            setQuerySearch(e.target.value);
            searchquery();
          }}
          value={querySearch}
        />

        {querySearch.length > 0 && (
          <GrFormClose
            size={30}
            onClick={() => {
              setQuerySearch("");
              setSearch(null);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      {dataBrands ? (
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
            {!search ? (
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
                            <Link
                              to={{
                                pathname: `${path}${brand.id} `,
                                state: brand,
                              }}
                            >
                              <TiEdit size={30} style={{ cursor: "pointer" }} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  "No hay marcas"
                )}
              </>
            ) : (
              <>
                {search.length > 0 ? (
                  <>
                    {search.map((brand) => {
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
                            <Link
                              to={{
                                pathname: `${path}${brand.id} `,
                                state: brand,
                              }}
                            >
                              <TiEdit size={30} style={{ cursor: "pointer" }} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  "No se encontraron coincidencias"
                )}
              </>
            )}
          </tbody>
        </table>
      ) : (
        <LoadingBlock />
      )}
    </div>
  );
}
