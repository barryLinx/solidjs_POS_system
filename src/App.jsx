import { Route, useNavigate } from "@solidjs/router";
import { lazy } from "solid-js";

const RouteGuard = lazy(() => import("./router/RouteGuard"));
const Menu = lazy(() => import("./pages/menu"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
//const Setting = lazy(() => import("./pages/seting"));
import Setting from "./pages/seting";
const NotFound = lazy(() => import("./pages/notFound404"));

import authStore from "./store/authStore";

function App() {
  const { userRole, setUSerRole } = authStore;
  const requireAdmin = () => {
    const navigate = useNavigate();
    if (userRole() !== "admin") {
      navigate("/home"); // 如果不是 admin，重定向到首页
      return false; // 阻止路由繼續
    }
    return true;
  };

  return (
    <>
    <Route path="/login" component={Login} />
      <Route path="/" component={RouteGuard}>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/setting" component={Setting} matchFilters={requireAdmin} />
      </Route>
      <Route path="/*404" component={NotFound} />
    </>
  );
}

export default App;
