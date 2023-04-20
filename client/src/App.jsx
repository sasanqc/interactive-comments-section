import Home from "./pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
