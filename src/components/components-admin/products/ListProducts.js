/* eslint-disable */
import "../../../css/ccs-admin/product/styles-component-listProduct.css";
import { TiEdit, GrFormClose } from "react-icons/all";
import { useEffect, useState } from "react";
import { getProducts } from "../../../api/admin/products";
import { useParams, Link } from "react-router-dom";
import LoadingBlock from "../../LoadingBlock";
export default function ListProducts() {
  const { type } = useParams();

  const [dataProducts, setDataProducts] = useState(null);
  const [search, setSearch] = useState(null);
  const [querySearch, setQuerySearch] = useState("");
  const path = "/typeUser/admin/dashboard/editProduct/";
  useEffect(() => {
    (async () => {
      if (type === "published" || type === "unpublished") {
        try {
          const data = await getProducts(type);
          setDataProducts(data.result);
        } catch (error) {
          console.log(error);
        }
      } else {
        window.location.replace("published");
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
      const result = dataProducts.filter((element) => {
        return element.title.includes(query);
      });
      setSearch(result);
    }
    if (query.length === 1) {
      setSearch(null);
    }
  };
  return (
    <>
      <div className="dashboard-container">
        <h2>Productos</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {/* seleccion de la visualizacion de productos publicados o no publicados */}
            <label htmlFor="">Ver productos</label>
            <select
              onChange={(e) => {
                location.replace(
                  "/typeUser/admin/dashboard/listProducts/" + e.target.value
                );
              }}
            >
              <option value="published" selected={type === "published" && true}>
                Publicados
              </option>
              <option
                value="unpublished"
                selected={type === "unpublished" && true}
              >
                No publicados
              </option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
        </div>
        {dataProducts ? (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Existencia</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <>
                {!search ? (
                  <>
                    {dataProducts.length > 0 ? (
                      <>
                        {dataProducts.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.title}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td>{product.stock}</td>
                              <td>${product.price}</td>
                              <td>
                                {product.discount
                                  ? product.discount + "%"
                                  : "SN"}
                              </td>
                              <td>
                                <Link
                                  to={{
                                    pathname: `${path}${product.id} `,
                                    state: product,
                                  }}
                                >
                                  <TiEdit
                                    size={30}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      "No products"
                    )}
                  </>
                ) : (
                  <>
                    {search.length > 0 ? (
                      <>
                        {search.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.title}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td>{product.stock}</td>
                              <td>${product.price}</td>
                              <td>
                                {product.discount
                                  ? product.discount + "%"
                                  : "SN"}
                              </td>
                              <td>
                                <Link
                                  to={{
                                    pathname: `${path}${product.id} `,
                                    state: product,
                                  }}
                                >
                                  <TiEdit
                                    size={30}
                                    style={{ cursor: "pointer" }}
                                  />
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
              </>
            </tbody>
          </table>
        ) : (
          <LoadingBlock />
        )}
      </div>
    </>
  );
}
