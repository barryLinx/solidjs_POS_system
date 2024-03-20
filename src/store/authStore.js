import { createSignal, createEffect,createMemo, createRoot  } from "solid-js";
/**we can build a global reactive data store by creating a signal in a global scope, and exporting it for other modules to use:  */
function createLoginStatus() {
  //const [accessToken, setAccessToken] = createSignal("");
  const [userName, setUserName] = createSignal("");
  
  // 事件監聽 localStorage的變化，更新localAccessToken
  const [localAccessToken, setLocalAccessToken] = createSignal(localStorage.getItem("localAccessToken"));

  //監聽 localStorage的變化，更新localAccessToken
  createEffect(() => {
    setLocalAccessToken(localStorage.getItem("localAccessToken"));
  });

  return { userName, setUserName, localAccessToken,setLocalAccessToken };
}

export default createRoot(createLoginStatus);
// // 建立一個全局的AuthStore
// const authStore = createAuthStore();

// // RouteGuard 组件用於保護路由
// const RouteGuard = (props) => {
//   const navigate = useNavigate();
//   const { localAccessToken } = authStore;

//   createEffect(() => {
//     // 如果localAccessToken為空，則導航到登錄頁面
//     if (!localAccessToken()) {
//       navigate("/login", { replace: true });
//     }
//   });

//   // render子组件
//   return props.children;
// };



