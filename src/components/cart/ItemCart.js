import "../../css/cart/styles-component-item-cart.css";

export default function itemCart(props) {
  const { activeDelete, setSelectedDelete, selectedDelete, data } = props;
  const deleteItem = (e) => {
    const selected = selectedDelete;
    if (e.target.checked) {
      selected.push({ id: data.id });
      setSelectedDelete(selected);
    } else {
      for (let index = 0; index < selected.length; index++) {
        if (selected[index].id === data.id) {
          selected.splice(index, 1);
        }
      }
      setSelectedDelete(selected);
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="item-cart">
      <div className="item-details">
        {activeDelete && (
          <input type="checkbox" onChange={(e) => deleteItem(e)} />
        )}
        <div style={{ width: "100%" }}>
          <h3>{data.title}</h3>
          <p className="quantity">
            <span style={{ fontWeight: "bold" }}>Cantidad:</span>{" "}
            {data.quantity}
          </p>
          <div className="price">
            <p>
              <span style={{ fontWeight: "bold" }}>Precio x unidad:</span>{" "}
              {formatter.format(data.price)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Precio total:</span>{" "}
              {formatter.format(data.price * data.quantity)}
            </p>
          </div>
        </div>
      </div>
      <img src={data.main_img} alt="imagen" />
    </div>
  );
}
