import "../../css/product/styles-detail-product.css";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  FaChevronCircleRight,
  FaChevronCircleLeft,
} from "react-icons/all";
import MarcaP from "../../assets/logMarca.png";
import { useState } from "react";
import { setItemCart } from "../../utils/useLocalStorage/useLocalStorage";
export default function DetailProduct(props) {
  const { data } = props;
  //cantidad seleccionada del producto
  const [quantity, setquantity] = useState(1);
  //uselocal para agregar productos al carrito
  const [transformX, setTransformX] = useState(0);
  //posicion de la imagen a ver
  const [position, setPosition] = useState(0);
  //incremento de cantidad seleccionada
  const increment = () => {
    if (quantity < 20) {
      setquantity(quantity + 1);
    } else {
      console.log("El limite de pedido es de 20 elementos");
    }
  };
  const decrement = () => {
    if (quantity >= 2) {
      setquantity(quantity - 1);
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
  const calcDiscount = (discount, price) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="container">
      <div className="detail-img">
        <div
          style={{
            display: "flex",
            width: "100%",
            transform: `translateX(${transformX}%)`,
          }}
        >
          <img src={`${data.main_img}`} alt="producto prueba" />
          {data.detail_img.map((item) => {
            return (
              <img src={`${item.url}`} alt={`${item.imgId}`} key={item.imgId} />
            );
          })}
        </div>
        <div className="direction">
          {position > 0 ? (
            <FaChevronCircleLeft
              className="icon-direction"
              onClick={() => {
                setTransformX(transformX + 100);
                setPosition(position - 1);
              }}
            />
          ) : (
            <FaChevronCircleLeft className="icon-direction" />
          )}
          {position < data.detail_img.length ? (
            <FaChevronCircleRight
              className="icon-direction"
              onClick={() => {
                setTransformX(transformX - 100);
                setPosition(position + 1);
              }}
            />
          ) : (
            <FaChevronCircleRight className="icon-direction" />
          )}
        </div>
      </div>
      <div className="view-details">
        <h2 className="view-title">{data.title}</h2>
        <p className="description">{data.description}</p>
        <div className="details">
          <div>
            <p style={{ marginBottom: "10px" }}>
              Marca: <span style={{ fontWeight: "bold" }}> {data.brand}</span>
            </p>
            <p style={{ marginBottom: "10px" }}>
              Unidades disponibles:
              <span style={{ fontWeight: "bold" }}> {data.stock}</span>
            </p>
            <p className="price-discount">
              {data.discount && formatter.format(data.price)}
            </p>
            <div className="container-price">
              <p className="price">
                {data.discount
                  ? formatter.format(calcDiscount(data.discount, data.price))
                  : formatter.format(data.price)}{" "}
              </p>
              {data.discount && (
                <p className="discount">{data.discount}% de descuento</p>
              )}
            </div>
          </div>
          <div>
            <img src={MarcaP} alt="marca" width="160px" height="80px" />

            <div className="quantity">
              <AiFillMinusCircle className="btn-quantity" onClick={decrement} />
              <input
                type="text"
                value={quantity}
                onChange={(e) => console.log(e)}
                className="input-quantity"
              />
              <AiFillPlusCircle className="btn-quantity" onClick={increment} />
            </div>
          </div>
        </div>

        <div className="detail-buttons">
          <button className="cart" onClick={() => setItemCart(data, quantity)}>
            Agregar a mi carrito
          </button>
          <button className="go-cart">Ir a mi carrito</button>
        </div>
      </div>
    </div>
  );
}
