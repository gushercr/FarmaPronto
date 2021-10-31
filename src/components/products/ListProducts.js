import Product from "./Product";
import "../../css/product/list-products.css";
export default function ListProducts() {
  return (
    <div
      className="list-horizontal-products"
      onScroll={() => console.log("scroll")}
    >
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <div className="directions"></div>
    </div>
  );
}
