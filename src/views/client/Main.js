import Carrousel from "../../components/Carrousel";
import Product from "../../components/products/Product";
import "../../css/styles-main.css";
import { getProductsMain } from "../../api/client/products/listProducts";
import { useEffect, useState } from "react";
import LoadingBlock from "../../components/LoadingBlock";
import ListBrands from "../../components/ListBrands";
export default function Main() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getProductsMain();
        setData(data.result);
      } catch (error) {
        console.log(error);
      }
      // console.log(data.result);
    })();
  }, []);
  return (
    <>
      <Carrousel />
      <div className="main">
        <ListBrands />
        <h1>Tal vez te pueda interesar</h1>
        {data ? (
          <div className="list-products">
            {data.map((item) => {
              return <Product data={item} key={item.id} />;
            })}
          </div>
        ) : (
          <LoadingBlock />
        )}
      </div>
    </>
  );
}
