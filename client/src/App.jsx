import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AppShell from "./layouts/AppShell";
import Signup from "./pages/Signup";
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path={["/", "/login"]} exact>
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>

    <Route exact path="*">
      <NotFound />
    </Route>
  </Switch>
);
const LoadingFallback = () => <div className="p-4">Loading...</div>;
const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated ? children : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path={["/", "/home"]} exact>
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/profile" exact>
            <Profile />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </AppShell>
  );
}

export default App;
