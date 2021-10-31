import { useState, useEffect } from "react";
import GeneralDates from "../../components/profile/profile-general/GeneralDates";
import "../../css/profile/generalDates/styles-view-profile.css";
import { BsList } from "react-icons/all";
import Adresses from "../../components/profile/address/Adresses";
import Configs from "../../components/profile/config/Configs";
import ListOrders from "../../components/profile/orders/ListOrders";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { deleteToken } from "../../utils/useLocalStorage/useLocalForLogin";
export default function Profile() {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const { path } = useRouteMatch();
  useEffect(() => {
    // funcion que recupera el width de la pantalla
    function changeResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeResize);
  });

  // const section = () => {
  //   switch (viewItem) {
  //     case 1:
  //       return <GeneralDates />;
  //     case 3:
  //       return <ListOrders />;
  //     case 2:
  //       return <Adresses />;
  //     case 4:
  //       return <Configs />;
  //     default:
  //       break;
  //   }
  // };
  const section = (
    <Switch>
      <Route path="/myProfile/info" component={GeneralDates} />
      <Route path="/myProfile/addresses" component={Adresses} />
      <Route path="/myProfile/orders" component={ListOrders} />
      <Route path="/myProfile/config" component={Configs} />

      <Redirect to="/myProfile/info" />
    </Switch>
  );
  return (
    <div className="container-profile">
      {windowWidth < 550 ? (
        <div className="options-responsive">
          <ul>
            <li>
              <BsList size={25} />
            </li>
            <ul>
              <li>
                <button onClick={() => history.push(`${path}/info`)}>
                  Mis datos
                </button>
              </li>
              <li>
                <button onClick={() => history.push(`${path}/addresses`)}>
                  Mis direcciones
                </button>
              </li>
              <li>
                <button onClick={() => history.push(`${path}/orders`)}>
                  Mis pedidos
                </button>
              </li>
              <li>
                <button onClick={() => history.push(`${path}/config`)}>
                  Configuraciones
                </button>
              </li>
              <li>
                <button className="logout" onClick={() => deleteToken()}>
                  Cerrar sesion
                </button>
              </li>
            </ul>
          </ul>
        </div>
      ) : (
        <div className="options">
          <h4>Opciones</h4>

          <button
            onClick={() => history.push(`${path}/info`)}
            className={
              window.location.pathname === path + "/info" ? "active" : "disable"
            }
          >
            Mis datos
          </button>

          <button
            onClick={() => history.push(`${path}/addresses`)}
            className={
              window.location.pathname === path + "/addresses"
                ? "active"
                : "disable"
            }
          >
            Mis direcciones
          </button>

          <button
            onClick={() => history.push(`${path}/orders`)}
            className={
              window.location.pathname === path + "/orders"
                ? "active"
                : "disable"
            }
          >
            Mis pedidos
          </button>

          <button
            onClick={() => history.push(`${path}/config`)}
            className={
              window.location.pathname === path + "/config"
                ? "active"
                : "disable"
            }
          >
            Configuraciones
          </button>

          <button className="logout" onClick={() => deleteToken()}>
            Cerrar sesion
          </button>
        </div>
      )}

      <div className="section">{section}</div>
    </div>
  );
}
