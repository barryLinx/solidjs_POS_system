// src/components/ProtectedRoute.js
import { createEffect, createMemo, Show } from "solid-js";
import Sidebars from "../layout/sidebars";
import { useNavigate } from "@solidjs/router";
import authStore from "../store/authStore";


const RouteGuard = (props) => {
  const navigate = useNavigate();
  const { localAccessToken, userName } = authStore;

  //如果用户未登錄，重定向到login頁面
  createMemo(() => {
    //沒有 localAccessToken 就跳轉到 login頁面
    // console.log("redirect", "redirect");
    //console.log("localAccessToken", localAccessToken);
    if (!localAccessToken()) {
      navigate("/login", { replace: true });
      return;
    }
  });

  return (
    <>
      <div class="container">
        <div className="row overflow-x-hidden overflow-y-hidden">
          <Sidebars />
          {/* <Show when={localAccessToken()} fallback={navigate("/login", { replace: true })}> </Show> */}
          {props.children}
          
        </div>
      </div>
    </>
  );
};

export default RouteGuard;
