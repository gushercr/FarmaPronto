import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./views/admin/Dashboard";
import LoginAdmin from "./views/admin/Login";
import "tailwindcss/tailwind.css";
import Index from "./views/client/Index";

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* rutas del administrador */}
          <Route exact path="/typeUser/admin" component={LoginAdmin} />
          <Route path="/typeUser/admin/dashboard" component={Dashboard} />

          {/* rutas publicas del cliente */}
          <Route path="/" component={Index} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
