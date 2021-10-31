import { useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { setItemCart } from "../../utils/useLocalStorage/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
export default function Product(props) {
  const data = props.data;
  const history = useHistory();
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
  const [quantity, setquantity] = useState(1);
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
  const calcDiscount = (discount, price) => {
    return price - (price * discount) / 100;
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="product">
        <div
          className="product-details"
          onClick={() => history.push(`/product/${data.id}`)}
        >
          <img src={`${data.main_img}`} alt={data.title} />
          <div className="details">
            <p className="product-title">{data.title}</p>
            <div className="prices">
              <p className="price-discount">
                {data.discount && formatter.format(data.price)}
              </p>
              <p className="price">
                {data.discount
                  ? formatter.format(calcDiscount(data.discount, data.price))
                  : formatter.format(data.price)}
              </p>
            </div>
          </div>
        </div>
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
        <button
          onClick={() => {
            toast.success("Producto añadido :)");
            setItemCart(data, quantity);
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </>
  );
}
