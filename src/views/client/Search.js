/* eslint-disable */
import "../../css/search/styles-view-search.css";
import {
  searchWithCategory,
  searchWithBrand,
  searchWithQuery,
} from "../../api/client/search/search";
import Product from "../../components/products/Product";
import { HiChevronLeft, HiChevronRight } from "react-icons/all";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingBlock from "../../components/LoadingBlock";
import NotProducts from "../../components/products/NotProducts";
export default function Search() {
  const { filter, value, skip } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [sort, setSort] = useState("az");
  // const error='';
  useEffect(() => {
    (async () => {
      let data = null;
      switch (filter) {
        case "category":
          data = await searchWithCategory(value, skip, sort);
          setData(data);
          break;
        case "brand":
          data = await searchWithBrand(value, skip, sort);
          setData(data);

          break;
        case "query":
          data = await searchWithQuery(value, skip, sort);
          setData(data);

          break;
        default:
          break;
      }
    })();
  }, [sort]);
  return (
    <div className="container-search">
      {data ? (
        <>
          {data.total !== 0 ? (
            <>
              <h2>Resultados de "{value}"</h2>
              <div className="list-products">
                {data.result.map((product) => {
                  return <Product data={product} />;
                })}
              </div>
              <div className="number-items">
                {data.previous && (
                  <button
                    className="number-button"
                    onClick={() => {
                      history.push(
                        `/search/${filter}/${value}/${parseInt(skip - 10)}`
                      );
                      window.location.replace("");
                    }}
                  >
                    <HiChevronLeft size={30} />
                    Anterior
                  </button>
                )}
                <p>
                  <span>{data.result.length}</span> de {data.total}
                </p>
                {data.next && (
                  <button
                    className="number-button"
                    onClick={() => {
                      history.push(
                        `/search/${filter}/${value}/${parseInt(skip + 10)}`
                      );
                      window.location.replace("");
                    }}
                  >
                    Siguiente
                    <HiChevronRight size={30} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h2>No se econtraron resultados de "{value}"</h2>
              <NotProducts />
            </>
          )}
          {/* <div className="search-filters">
        <select name="" id=""></select>          
      </div> */}
        </>
      ) : (
        <LoadingBlock />
      )}
    </div>
  );
}
