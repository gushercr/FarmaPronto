import { Route, Switch, Redirect } from "react-router-dom";
import Search from "./Search";
import Main from "./Main";
import ProductDetail from "./ProductDetails";
import Cart from "./Cart";
import Profile from "./Profile";
import Register from "./Register";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageNotFound from "../../views/client/PageNotFound";

export default function Index() {
  function userAuth() {
    const token = localStorage.getItem("userToken");
    if (token && token !== "") {
      return true;
    } else {
      return false;
    }
  }
  const routes = (
    <Switch>
      <Route exact path="/product/:id" component={ProductDetail} />
      <Route path="/search/:filter/:value/:skip" component={Search} />

      <Route exact path="/myCart" component={Cart} />
      <Route
        path="/myProfile"
        render={() => <>{userAuth() ? <Profile /> : <Redirect to="/" />}</>}
      />
      <Route
        path="/register"
        render={() => <>{!userAuth() ? <Register /> : <PageNotFound />}</>}
      />
      <Route exact path="/" component={Main} />
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
  return (
    <>
      <Header />
      {routes}
      <Footer />
    </>
  );
}
