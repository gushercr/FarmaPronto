const calcDiscount = (discount, price) => {
  return price - (price * discount) / 100;
};
export function setItemCart(data, quantity) {
  if (localStorage.getItem("cartItems")) {
    const antes = JSON.parse(localStorage.getItem("cartItems"));
    antes.push({
      id: data.id,
      title: data.title,
      price: data.discount
        ? calcDiscount(data.discount, data.price)
        : data.price,
      quantity: quantity,
      main_img: data.main_img,
    });
    localStorage.setItem("cartItems", JSON.stringify(antes));
  } else {
    const nuevo = [
      {
        id: data.id,
        title: data.title,
        price: data.discount
          ? calcDiscount(data.discount, data.price)
          : data.price,
        quantity: quantity,
        main_img: data.main_img,
      },
    ];
    localStorage.setItem("cartItems", JSON.stringify(nuevo));
  }
}
export function deleteCart(items) {
  const itemsCart = JSON.parse(localStorage.getItem("cartItems"));
  for (let itemEliminar = 0; itemEliminar < items.length; itemEliminar++) {
    for (
      let itemCartPosition = 0;
      itemCartPosition < itemsCart.length;
      itemCartPosition++
    ) {
      if (itemsCart[itemCartPosition].id === items[itemEliminar].id) {
        itemsCart.splice(itemCartPosition, 1);
      }
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(itemsCart));
}
