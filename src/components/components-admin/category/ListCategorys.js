import { useEffect, useState } from "react";
import { getCategorys } from "../../../api/admin/categorys";
import LoadingBlock from "../../LoadingBlock";
import { Link } from "react-router-dom";
import { TiEdit, GrFormClose } from "react-icons/all";

export default function ListCategorys() {
  const [dataCategorys, setData] = useState(null);
  const path = "/typeUser/admin/dashboard/editCategory/";
  const [search, setSearch] = useState(null);
  const [querySearch, setQuerySearch] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const data = await getCategorys();
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
      const result = dataCategorys.filter((element) => {
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
      {dataCategorys ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {!search ? (
              <>
                {dataCategorys.length > 0 ? (
                  <>
                    {dataCategorys.map((category) => {
                      return (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>

                          <td>
                            <Link
                              to={{
                                pathname: `${path}${category.id} `,
                                state: category,
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
                  "No hay categorias"
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
