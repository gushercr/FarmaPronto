import ItemListOrders from "./ItemListOrders";
import { useState, useEffect } from "react";
import { getListOrders } from "../../../api/client/orders/orders";
import NotOrders from "./NotOrders";
import LoadingBlock from "../../LoadingBlock";
export default function ListOrders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getListOrders();
      setOrders(response.result);
    })();
  }, []);
  return (
    <>
      <h2 style={{ marginBottom: "25px" }}>Mis pedidos</h2>
      {orders ? (
        <>
          {orders.length !== 0 ? (
            <>
              {orders.map((order) => {
                return <ItemListOrders key={order.id} data={order} />;
              })}
            </>
          ) : (
            <NotOrders />
          )}
        </>
      ) : (
        <LoadingBlock />
      )}
    </>
  );
}
