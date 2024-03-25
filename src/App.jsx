import { Route,useNavigate  } from "@solidjs/router";
import { lazy  } from "solid-js";
//import billStore from "./store/billStore";
// import Home from "./pages/home";
// import Menu from "./pages/menu";
// import Login from "./pages/login";
// import Seting from "./pages/seting";
import RouteGuard from "./router/RouteGuard";

const Menu = lazy(() => import("./pages/menu"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Seting = lazy(() => import("./pages/seting"));

import authStore from "./store/authStore";

function App() {
  const {userRole, setUSerRole } = authStore; 

  // const routes=[
  //   {
  //     path: "/login",
  //     component: lazy(()=>Login),
  //   },
    
  //   {
  //     path: "/*all",
  //     component: lazy(() => import("./pages/notFound404")),
  //   },
  //   {
  //     path: "/",
  //     component: lazy(() => RouteGuard ),
  //     children: [
  //       {
  //         path: "/home",
  //         component:lazy(()=>Home)
  //       },
  //       {
  //         path: "/menu",
  //         component:lazy(()=>Menu)
  //       },
  //       {
  //         path: "/settings",
  //         component: lazy(() => Seting ),
  //         //filter: requireAdmin, // 增加 matchFilters 屬性，將 requireAdmin 函數傳入
  //       },
  //     ]
  //   }
  // ];

  const requireAdmin = () => {
    const navigate = useNavigate();
    if (userRole() !== 'admin') {
      navigate('/home'); // 如果不是 admin，重定向到首页
      return false; // 阻止路由繼續
    }
    return true;
  };
 
  
  return (
    <>
   
      <Route path="/login" component={Login} />
      <Route path="/" component={RouteGuard}>
        <Route path="/home" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/setting" component={Seting} matchFilters={requireAdmin} />
      </Route>
      <Route path="/*404" component={() => <h1>Page Not Found</h1>} />
   
    </>
  );
}

export default App;
//<Show when={true} fallback={<Login />}></Show>
