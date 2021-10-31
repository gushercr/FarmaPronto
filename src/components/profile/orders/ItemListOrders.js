import "../../../css/profile/orders/styles-component-item-list-orders.css";
import {
  VscCircleFilled,
  CgChevronDoubleDownO,
  CgChevronDoubleUpO,
  FiMoreVertical,
} from "react-icons/all";
import Moment from "react-moment";
import { useState } from "react";
export default function ItemListOrders(props) {
  const [viewDetails, setViewDetails] = useState(false);
  const { data } = props;

  return (
    <div className="item-list-orders">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="top-options">
          <FiMoreVertical size={20} />
          <div className="top-options-orders">
            <button>Cancelar</button>
            <button>Eliminar</button>
          </div>
        </div>
      </div>
      <div className="order-top-details">
        <p className="date">
          Fecha: <Moment format="DD/MM/YYYY">{data.date}</Moment>
        </p>
        <p className="status">
          {data.status}{" "}
          <VscCircleFilled
            className={data.status === "En camino" ? "enviado" : "cancelado"}
          />
        </p>
      </div>
      {viewDetails && (
        <div className="order-body-details">
          <p>
            <span>Productos</span>
          </p>
          {data.products.map((product) => {
            return (
              <div className="body-details-item">
                <p>{product.product}</p>
                <p>
                  <span>Cantidad: </span>
                  {product.quantity}
                </p>
                <p>
                  <span>Subtotal:</span> ${product.subtotal}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="order-bottom-details">
        <div
          className="view-details-order"
          onClick={() => setViewDetails(!viewDetails)}
        >
          <p>{viewDetails ? "Menos detalles" : "Mas detalles"}</p>
          {viewDetails ? (
            <CgChevronDoubleUpO size={20} />
          ) : (
            <CgChevronDoubleDownO size={20} />
          )}
        </div>
        <p>
          <span>Total:</span> $520
        </p>
      </div>
    </div>
  );
}
