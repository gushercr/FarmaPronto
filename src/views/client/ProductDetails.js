/* eslint-disable */
import DetailProduct from "../../components/products/DetailProduct";
import LoadingBlock from "../../components/LoadingBlock";
// import ListProducts from "../../components/products/ListProducts";
import "../../css/product/styles-view-details-product.css";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../api/client/products/getProductDetails";
import { useParams } from "react-router-dom";
export default function ProductDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getProductDetail(id);
      setData(data.result);
    })();
  }, []);
  return (
    <>
      {data ? <DetailProduct data={data} /> : <LoadingBlock />}
      {/* <LoadingBlock /> */}
      <div className="relations">
        <h2>Tambien te podria interesar</h2>
        {/* <ListProducts /> */}
      </div>
    </>
  );
}
