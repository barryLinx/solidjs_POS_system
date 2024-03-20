import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import authStore from "../store/authStore";
function sidebars() {
  const navigate = useNavigate();
  const { setLocalAccessToken,localAccessToken } = authStore;
  const [current, setCurrent] = createSignal("");
  const [options, setOptions] = createSignal([
    { name: "menu", icon: "fas fa-concierge-bell",disabled:false },
    { name: "history", icon: "fas fa-clock",disabled:true },
    { name: "wallet", icon: "fas fa-wallet",disabled:true },
    { name: "promos", icon: "fas fa-percent",disabled:true },
  ]);
  // console.log(location.pathname);
  // console.log("current", current());
  createEffect(() => {
    setCurrent(location.pathname);
    console.log("location.pathname", location.pathname);

    if(!localAccessToken){
      navigate("/login", { replace: true });
    }    
  });

 
  const handleLogout = () => {    
   localStorage.setItem("localAccessToken", "");
   setLocalAccessToken('');  
  };

  return (
    // <!--sidebar-->
    <div class="col-1 d-flex justify-content-center">
      <div class="sidebar position-fixed d-flex flex-column align-items-center justify-content-between">
        <div class="logo row mt-4">
          <h1 class="mt-4">
            <i
              class="fab fa-pagelines"
              style="font-size: 55px; color: chocolate;"
            ></i>
          </h1>
        </div>
        <nav class="sidebar-menu mt-5 mb-5 row flex-column align-items-center justify-content-between">
          <a
            class="py-2 rounded-4 btn btn-outline-primary d-flex flex-column"
            onClick={() => setCurrent("/home")}
            classList={{ active: current() === "/home"|| current() === "/login" }}
            href="/home"
          >
            <i class="fas fa-home fs-2 mb-2"></i>
            <span>home</span>
          </a>
          <For each={options()}>
            {(option, i) => (
              <a
                class="py-2 rounded-4 mt-3 btn btn-outline-primary d-flex flex-column"
                onClick={() => setCurrent(option.name)}
                classList={{ active: current() === option.name, disabled: option.disabled}}
                href={option.name}
                
              >
                <i class={`${option.icon} fs-2 mb-2`}></i>
                <span>{option.name}</span>
              </a>
            )}
          </For>

          <a
            class="py-2 rounded-4 mt-3 btn btn-outline-primary d-flex flex-column"
          >
            <i class="fas fa-cog fs-2 mb-2"></i>
            <span>setting</span>
          </a>
        </nav>
        <div class="signout-wrap mt-5 mb-5">
          <button
            onClick={handleLogout}
            class="py-2 btn btn-outline-primary d-flex flex-column"
          >
            <i class="fas fa-sign-out-alt fs-2"></i>
            <span>logout</span>
          </button>
        </div>
      </div>
    </div>
    // <!--sidebar end-->
  );
}
export default sidebars;
