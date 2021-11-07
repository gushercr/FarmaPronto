import { useRef } from "react";
import "../../css/ccs-admin/styles-view-dashboard.css";
import { BsGearWideConnected, BiUserCircle } from "react-icons/all";
import ListProducts from "../../components/components-admin/products/ListProducts";
import AddProduct from "../../components/components-admin/products/AddProduct";
import EditProduct from "../../components/components-admin/products/EditProduct";
import ListBrand from "../../components/components-admin/marks/ListBrand";
import AddBrand from "../../components/components-admin/marks/AddBrand";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
export default function Dashboard() {
  const itemCarrusel = useRef(null);
  const itemMark = useRef(null);
  const itemCategory = useRef(null);
  const itemOrder = useRef(null);
  const itemUser = useRef(null);
  const itemProduct = useRef(null);
  const { path } = useRouteMatch();
  const setSelected = (e) => {
    var selected = document.getElementsByClassName("active");
    let anotherSubmenu = document.getElementsByClassName("item-option-submenu");
    let submenu = document
      .getElementById(e.target.parentNode.id)
      .getElementsByClassName("item-option-submenu")[0];
    // verificamos que no haya otro submenu abierto
    for (let index = 0; index < anotherSubmenu.length; index++) {
      if (anotherSubmenu[index].classList.length < 2) {
        anotherSubmenu[index].classList.toggle("hidden");
      }
    }
    submenu.classList.toggle("hidden");
    if (selected) {
      switch (e.target.parentNode.id) {
        case "carrusel":
          selected[0].classList.toggle("active");
          itemCarrusel.current.children[0].classList.value = "active";
          // selected = itemCarrusel;
          // setViewItem(1);
          break;
        case "product":
          selected[0].classList.toggle("active");
          itemProduct.current.children[0].classList.value = "active";
          // selected = itemMark;
          break;
        case "mark":
          selected[0].classList.toggle("active");
          itemMark.current.children[0].classList.value = "active";
          // selected = itemMark;
          break;
        case "category":
          selected[0].classList.toggle("active");
          itemCategory.current.children[0].classList.value = "active";
          // selected = itemMark;

          break;
        case "order":
          selected[0].classList.toggle("active");
          itemOrder.current.children[0].classList.value = "active";
          // selected = itemMark;
          break;
        case "user":
          selected[0].classList.toggle("active");
          itemUser.current.children[0].classList.value = "active";
          // selected = itemMark;
          break;
        default:
          console.log("error");
          break;
      }
    }
  };
  const section = (
    <Switch>
      <Route
        path="/typeUser/admin/dashboard/listProducts/:type"
        component={ListProducts}
      />
      <Route
        path="/typeUser/admin/dashboard/editProduct/:id"
        component={EditProduct}
      />
      <Route
        path="/typeUser/admin/dashboard/addProduct"
        component={AddProduct}
      />
      <Route path="/typeUser/admin/dashboard/listBrand" component={ListBrand} />
      <Route path="/typeUser/admin/dashboard/addBrand" component={AddBrand} />

      {/* <Route
        path="/typeUser/admin/dashboard/ListOrders"
        component={ListOrders}
      /> */}
      <Redirect to="/typeUser/admin/dashboard/Carrousel" />
    </Switch>
  );

  return (
    <div className="container-dashboard">
      <nav>
        <div className="logo">imagen</div>
        <div className="user-info">
          <p>Gushercr</p>
          <BsGearWideConnected size={24} />
          <BiUserCircle size={24} />
        </div>
      </nav>

      <div className="dashboard">
        <div className="dashboard-options">
          <div className="item-option" ref={itemCarrusel} id="carrusel">
            <button
              className={
                window.location.pathname.indexOf("Carrousel") !== -1
                  ? "active"
                  : null
              }
              onClick={(e) => setSelected(e)}
            >
              Carrusel de promociones
            </button>
            <div className="item-option-submenu hidden">
              <button>submenu</button>
            </div>
          </div>
          <div className="item-option" ref={itemProduct} id="product">
            <button
              className={
                window.location.pathname.indexOf("Product") !== -1
                  ? "active"
                  : null
              }
              onClick={(e) => setSelected(e)}
            >
              Productos
            </button>
            <div className="item-option-submenu hidden">
              <Link to={`${path}/listProducts/published`}>
                <button>Listar productos</button>
              </Link>
              <Link to={`${path}/addProduct`}>
                <button>Agregar producto</button>
              </Link>
            </div>
          </div>
          <div className="item-option" ref={itemMark} id="mark">
            <button
              className={
                window.location.pathname.indexOf("Brand") !== -1
                  ? "active"
                  : null
              }
              onClick={(e) => setSelected(e)}
            >
              Marcas
            </button>
            <div className="item-option-submenu hidden">
              <Link to={`${path}/listBrand`}>
                <button>Listar marcas</button>
              </Link>
              <Link to={`${path}/addBrand`}>
                <button>Agregar marcas</button>
              </Link>
            </div>
          </div>
          <div className="item-option" ref={itemCategory} id="category">
            <button
              className={
                window.location.pathname.indexOf("Category") !== -1
                  ? "active"
                  : null
              }
              onClick={(e) => setSelected(e)}
            >
              Categorias
            </button>
            <div className="item-option-submenu hidden">
              <button>submenu</button>
            </div>
          </div>
          <div className="item-option" ref={itemOrder} id="order">
            <button
              className={
                window.location.pathname.indexOf("Order") !== -1
                  ? "active"
                  : null
              }
              onClick={(e) => setSelected(e)}
            >
              Pedidos
            </button>
            <div className="item-option-submenu hidden">
              <button>submenu</button>
            </div>
          </div>
          <div className="item-option" ref={itemUser} id="user">
            <button onClick={(e) => setSelected(e)}>Usuarios</button>
            <div className="item-option-submenu hidden">
              <button>submenu</button>
            </div>
          </div>
          {/* <div className="item-option" id="">
            <button>Roles</button>
            <div className="item-option-submenu hidden">
              <button>submenu</button>
            </div>
          </div> */}
        </div>
        <div className="dashboard-content">{section}</div>
      </div>
    </div>
  );
}
