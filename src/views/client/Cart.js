import "../../css/cart/styles-view-cart.css";
import ItemCart from "../../components/cart/ItemCart";
import { FcMoneyTransfer, MdDelete } from "react-icons/all";
import { useState, useEffect } from "react";
import { deleteCart } from "../../utils/useLocalStorage/useLocalStorage";
import empty from "../../assets/empty-cart.png";
export default function Cart() {
  const [activeDelete, setActiveDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState([]);
  // estado de los productos añadidos al carrito
  const [dataCart, setDataCart] = useState(null);
  // recuperacion de informacion del carrito de compras
  useEffect(() => {
    setDataCart(JSON.parse(localStorage.getItem("cartItems")));
    // localStorage.clear();
  }, []);
  return (
    <>
      <div className="container-cart">
        {dataCart && (
          <>
            {dataCart.length !== 0 ? (
              <h2>Mi carrito de compras</h2>
            ) : (
              <h2 style={{ textAlign: "center" }}>
                Aun no has agregado nada a tu carrito
              </h2>
            )}
            {dataCart.length !== 0 ? (
              <div className="cart-price-total">
                <div>
                  {!activeDelete && (
                    <MdDelete
                      size={30}
                      color="#103f6e"
                      onClick={() => setActiveDelete(true)}
                    />
                  )}
                  {activeDelete && (
                    <>
                      <button
                        onClick={() => {
                          deleteCart(selectedDelete);
                          window.location.replace("");
                        }}
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => {
                          setActiveDelete(false);
                          setSelectedDelete([]);
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
                <div>
                  <p>Total: $5000</p>
                  <button>
                    Pagar
                    <FcMoneyTransfer className="icon-btn" size={25} />
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
        {dataCart && (
          <>
            {dataCart.length !== 0 ? (
              <>
                {dataCart.map((item) => {
                  return (
                    <ItemCart
                      activeDelete={activeDelete}
                      setSelectedDelete={setSelectedDelete}
                      selectedDelete={selectedDelete}
                      key={item.id}
                      data={item}
                    />
                  );
                })}
              </>
            ) : (
              <img src={empty} alt="empty" className="empty-cart" />
            )}
          </>
        )}
      </div>
    </>
  );
}
