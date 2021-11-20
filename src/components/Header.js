import { useState, useEffect } from "react";
import Logo from "../assets/logoFarmaPronto.png";
// import LogoResponsivo from "../assets/logoFarmaPronto-responsivo.png";
import "../css/styles-header.css";
import {
  BiSearchAlt,
  GoSignIn,
  FiShoppingCart,
  BiCaretDown,
  GrFormClose,
  AiOutlineMenu,
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import Login from "./login/Login";
import { deleteToken } from "../utils/useLocalStorage/useLocalForLogin";
import { getListBrands } from "../api/client/brand/listBrand";
import { getListCategorys } from "../api/client/category/listCategorys";
export default function Header() {
  // state para el width de la ventana
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [viewLogin, setViewLogin] = useState(false);
  const [query, SetQuery] = useState("");
  const [userAuth, setUserAuth] = useState(null);
  const [brands, setBrands] = useState(null);
  const [categorys, setCategorys] = useState(null);
  const [viewSearch, setviewSearch] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // funcion que recupera el width de la pantalla
    function changeResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeResize);
  });
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token && token !== "") {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, []);
  useEffect(() => {
    (async () => {
      const response = await getListBrands();
      setBrands(response.result);
      const responseCategory = await getListCategorys();
      setCategorys(responseCategory.result);
    })();
  }, []);
  const search = () => {
    if (query !== "") {
      history.push(`/search/query/${query}/0`);
      window.location.replace("");
    }
  };
  const keyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div className="header">
        <div className="h-top">
          <div className="h-img">
            {windowWidth < 700 && <AiOutlineMenu color="#000" />}
            {/* condicion para opciones responsivas */}
            <Link to="/">
              <img src={Logo} alt="logoFarmaPronto" />
            </Link>
          </div>

          {windowWidth > 600 ? (
            <>
              <div className="h-search">
                <input
                  type="text"
                  placeholder="Busca aqui tu producto"
                  onChange={(e) => SetQuery(e.target.value)}
                  value={query}
                  onKeyPress={(e) => keyPress(e)}
                />
                {query && (
                  <span
                    className="h-search-btn-close"
                    onClick={() => SetQuery("")}
                  >
                    <GrFormClose size={20} />
                  </span>
                )}
                <button className="btnBusqueda">
                  <BiSearchAlt />
                </button>
              </div>
            </>
          ) : (
            <>
              {viewSearch && (
                <div className="search-container-responsive">
                  <div className="h-search">
                    <input
                      type="text"
                      placeholder="Busca aqui tu producto"
                      onChange={(e) => SetQuery(e.target.value)}
                      value={query}
                      onKeyPress={(e) => keyPress(e)}
                    />
                    {query && (
                      <span
                        className="h-search-btn-close"
                        onClick={() => SetQuery("")}
                      >
                        <GrFormClose size={20} />
                      </span>
                    )}
                    <button className="btnBusqueda">
                      <BiSearchAlt />
                    </button>
                  </div>
                  <GrFormClose
                    style={{ width: 32 }}
                    onClick={() => setviewSearch(false)}
                  />
                </div>
              )}
            </>
          )}
          <div className="h-options">
            {/* botones de logueo */}
            {windowWidth > 550 ? (
              <>
                <Link to="/mycart" style={{ marginRight: "10px" }}>
                  <FiShoppingCart className="btn-cartBuy" />
                </Link>
                {userAuth ? (
                  <>
                    <div className="auth-options">
                      {windowWidth > 800 && (
                        <p style={{ marginRight: "10px" }}>
                          {localStorage.getItem("userName")}
                        </p>
                      )}
                      <svg
                        width="40"
                        height="37"
                        viewBox="0 0 40 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.3427 0.00316971C9.29849 -0.194257 0.191728 9.0137 0.00304136 20.5695C-0.104133 27.1216 2.68692 33.0105 7.13086 36.9266C7.42144 36.6613 7.73315 36.418 8.07958 36.2206L14.0474 32.8146C14.83 32.3676 15.3176 31.5092 15.3176 30.5758V28.0172C15.3176 28.0172 13.5658 25.8249 12.8979 22.779C12.3439 22.4039 11.9726 21.7556 11.9726 21.0172V18.2169C11.9726 17.601 12.2345 17.0505 12.6413 16.6652V12.6171C12.6413 12.6171 11.8465 6.31765 20 6.31765C28.1536 6.31765 27.3588 12.6171 27.3588 12.6171V16.6652C27.7664 17.0505 28.0275 17.601 28.0275 18.2169V21.0172C28.0275 21.9585 27.4237 22.7506 26.6041 23.0152C26.1474 24.5006 25.4885 25.9165 24.6176 27.2038C24.3979 27.5283 24.1926 27.8032 24.013 28.0172V30.6406C24.013 31.6064 24.5346 32.49 25.3602 32.9212L31.7507 36.264C32.1341 36.4646 32.4805 36.7181 32.7998 37.0001C37.1094 33.2395 39.8936 27.6168 39.997 21.2849C40.1872 9.72917 31.3876 0.200596 20.3427 0.00316971Z"
                          fill="#556080"
                        />
                      </svg>
                      <div className="auth-options-down">
                        <a href="/myProfile/info">Mis datos</a>
                        <a href="/myProfile/orders">Mis pedidos</a>
                        <a href="/myProfile/config">Configuraciones</a>
                        <button
                          onClick={() => {
                            deleteToken();
                            window.location.replace("");
                          }}
                        >
                          Cerrar sesion
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setViewLogin(true)}>Acceder</button>
                  </>
                )}
              </>
            ) : (
              <>
                <BiSearchAlt
                  size={20}
                  color="#000"
                  style={{ marginRight: "15px" }}
                  onClick={() => setviewSearch(true)}
                />
                {userAuth ? (
                  <>
                    <div className="auth-options">
                      <svg
                        width="40"
                        height="37"
                        viewBox="0 0 40 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.3427 0.00316971C9.29849 -0.194257 0.191728 9.0137 0.00304136 20.5695C-0.104133 27.1216 2.68692 33.0105 7.13086 36.9266C7.42144 36.6613 7.73315 36.418 8.07958 36.2206L14.0474 32.8146C14.83 32.3676 15.3176 31.5092 15.3176 30.5758V28.0172C15.3176 28.0172 13.5658 25.8249 12.8979 22.779C12.3439 22.4039 11.9726 21.7556 11.9726 21.0172V18.2169C11.9726 17.601 12.2345 17.0505 12.6413 16.6652V12.6171C12.6413 12.6171 11.8465 6.31765 20 6.31765C28.1536 6.31765 27.3588 12.6171 27.3588 12.6171V16.6652C27.7664 17.0505 28.0275 17.601 28.0275 18.2169V21.0172C28.0275 21.9585 27.4237 22.7506 26.6041 23.0152C26.1474 24.5006 25.4885 25.9165 24.6176 27.2038C24.3979 27.5283 24.1926 27.8032 24.013 28.0172V30.6406C24.013 31.6064 24.5346 32.49 25.3602 32.9212L31.7507 36.264C32.1341 36.4646 32.4805 36.7181 32.7998 37.0001C37.1094 33.2395 39.8936 27.6168 39.997 21.2849C40.1872 9.72917 31.3876 0.200596 20.3427 0.00316971Z"
                          fill="#556080"
                        />
                      </svg>
                      <div className="auth-options-down">
                        <a href="/myProfile/info">Mis datos</a>
                        <a href="/myProfile/orders">Mis pedidos</a>
                        <a href="/myProfile/config">Configuraciones</a>
                        <button
                          onClick={() => {
                            deleteToken();
                            window.location.replace("");
                          }}
                        >
                          Cerrar sesion
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <GoSignIn color="#000" onClick={() => setViewLogin(true)} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="h-bottom">
          <nav id="list-categorias">
            <ul>
              <li>
                Categorias
                <BiCaretDown />
              </li>
              <ul>
                {categorys && (
                  <>
                    {categorys.map((category) => {
                      return (
                        <li key={category.id}>
                          <a href={`/search/category/${category.name}/0`}>
                            {category.name}
                          </a>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </ul>
            <ul>
              <li>
                Marcas
                <BiCaretDown />
              </li>
              <ul>
                {brands && (
                  <>
                    {brands.map((brand) => {
                      return (
                        <li key={brand.id}>
                          <a href={`/search/brand/${brand.name}/0`}>
                            {brand.name}
                          </a>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </ul>
          </nav>
        </div>
      </div>
      {viewLogin && <Login setViewLogin={setViewLogin} />}
    </>
  );
}
