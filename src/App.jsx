import { Route,useNavigate  } from "@solidjs/router";
import { onMount, onCleanup } from "solid-js";
//import billStore from "./store/billStore";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Login from "./pages/login";
import Seting from "./pages/seting";
import RouteGuard from "./router/RouteGuard";
import authStore from "./store/authStore";

function App() {
  const {userRole, setUSerRole } = authStore; 
  //監聽點擊事件，用於判斷是否點擊了空白處，清空帳數據
  // const handleClickOutside = (event) => {
  //   const popupElement = document.querySelector(".popup");
  //   if (popupElement && !popupElement.contains(event.target)) {
  //      revertBillData();
  //     console.log("editBill", editBill());
  //   }
  // };
  const requireAdmin = () => {
    const navigate = useNavigate();
    if (userRole() !== 'admin') {
      navigate('/home'); // 如果不是 admin，重定向到首页
      return false; // 阻止路由繼續
    }
    return true;
  };
  
  // onMount(() => {
  //   // 當組件掛載時，添加點擊監聽
  //  // document.addEventListener("click", handleClickOutside);
  //   const myModalEl = document.getElementById("exampleModal");
  //   myModalEl.addEventListener("hidden.bs.modal", () => {
  //     // do something...
  //     revertBillData();
  //     //console.log("editBill", editBill());
  //   });
  // });

  // onCleanup(() => {
  //   // 組件卸載時，移除點擊監聽
  //   //document.removeEventListener("click", handleClickOutside);
  //   const myModalEl = document.getElementById("exampleModal");
  //   if(myModalEl) {
  //     myModalEl.removeEventListener("hidden.bs.modal");
  //   }
  // });
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
