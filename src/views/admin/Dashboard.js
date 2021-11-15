import { useRef } from "react";
import "../../css/ccs-admin/styles-view-dashboard.css";
import { BiLogOutCircle } from "react-icons/all";
import Logo from "../../assets/logoFarmaPronto-responsivoBN.png";
// productos
import ListProducts from "../../components/components-admin/products/ListProducts";
import AddProduct from "../../components/components-admin/products/AddProduct";
import EditProduct from "../../components/components-admin/products/EditProduct";
// marcas
import ListBrand from "../../components/components-admin/marks/ListBrand";
import AddBrand from "../../components/components-admin/marks/AddBrand";
import EditBrand from "../../components/components-admin/marks/EditBrand";
// categorias
import ListCategorys from "../../components/components-admin/category/ListCategorys";
import AddCategory from "../../components/components-admin/category/AddCategory";
import EditCategory from "../../components/components-admin/category/EditCategory";

import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import ListElementsCarrousel from "../../components/components-admin/carrousel/ListElementsCarrousel";
import EditElements from "../../components/components-admin/carrousel/EditElements";
export default function Dashboard() {
  const itemCarrusel = useRef(null);
  const itemMark = useRef(null);
  const itemCategory = useRef(null);
  const itemOrder = useRef(null);
  const itemUser = useRef(null);
  const itemProduct = useRef(null);
  const { path } = useRouteMatch();
  function userAuth() {
    const token = localStorage.getItem("adminToken");
    if (token && token !== "") {
      return true;
    } else {
      return false;
    }
  }
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
      {/* rutas de productos */}
      {userAuth() ? (
        <>
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
          {/* rutas de marcas */}
          <Route
            path="/typeUser/admin/dashboard/listBrand"
            component={ListBrand}
          />
          <Route
            path="/typeUser/admin/dashboard/editBrand/:id"
            component={EditBrand}
          />
          <Route
            path="/typeUser/admin/dashboard/addBrand"
            component={AddBrand}
          />
          {/* rutas de categorias */}
          <Route
            path="/typeUser/admin/dashboard/listCategorys"
            component={ListCategorys}
          />
          <Route
            path="/typeUser/admin/dashboard/addCategory"
            component={AddCategory}
          />
          <Route
            path="/typeUser/admin/dashboard/editCategory/:id"
            component={EditCategory}
          />
          {/* rutas del carrusel */}
          <Route
            path="/typeUser/admin/dashboard/Carrousel"
            component={ListElementsCarrousel}
          />
          <Route
            path="/typeUser/admin/dashboard/editCarrousel"
            component={EditElements}
          />
          <Redirect to="/typeUser/admin/dashboard/Carrousel" />
        </>
      ) : (
        <Redirect to="/typeUser/admin/" />
      )}
    </Switch>
  );

  return (
    <div className="container-dashboard">
      <nav>
        <div className="logo">
          <img src={Logo} alt="Logo FarmaPronto" width="50px" />
        </div>
        <div className="user-info">
          <p> {localStorage.getItem("nameAdmin")}</p>
          <button
            style={{
              backgroundColor: "transparent",
              border: "solid 2px #ff2222",
              marginLeft: "10px",
              color: "#ff2222",
              display: "flex",
              fontSize: "15px",
              alignItems: "center",
              height: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.replace("");
            }}
          >
            Logout
            <BiLogOutCircle />
          </button>
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
              <Link to={`${path}/Carrousel`}>
                <button>Vista previa</button>
              </Link>
              <Link to={`${path}/editCarrousel`}>
                <button>Editar carrousel</button>
              </Link>
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
              <Link to={`${path}/listCategorys`}>
                <button>Listar Categorias</button>
              </Link>
              <Link to={`${path}/addCategory`}>
                <button>Agregar categoria</button>
              </Link>
            </div>
          </div>
          {/* <div className="item-option" ref={itemOrder} id="order">
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
          </div> */}
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
