import { createSignal, createEffect } from "solid-js";
import { redirect, useNavigate } from "@solidjs/router";
import authStore from "../store/authStore";
import customFetch from "../helper/customFetch";
import {loginErrorNotify} from "../helper/notifyToast"
import { Toaster } from 'solid-toast';

function Login() {
  const { localAccessToken,userName ,setUserName ,setLocalAccessToken} = authStore; 
  const [passWord, setPassWord] = createSignal("");
  const navigate = useNavigate();
 // const errCode =[404,441];

createEffect(() => {
//有 accessToken 就跳轉到首頁
  if (localAccessToken()) {
    navigate("/", { replace: true });
  }
})

  const handleLogin =async (e) => {
    e.preventDefault();
    //console.log(userName(), passWord())
   // try {
      const response = await customFetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userName(),
          password: passWord(),
        }),
      });
      //

      console.log("Login",response);
      // 更新資料
     
    //  setUserRole(jsonData.userRole);

    if(response.ok){
      const jsonData = await response.json();
      localStorage.setItem("localAccessToken", jsonData.accessToken);
      setLocalAccessToken(jsonData.accessToken);
      navigate("/", { replace: true });
    }

    if( response.status == 441){
      // const jsonData = await response.json();
      // console.log("Login",jsonData);
      loginErrorNotify();
    }

  }
   
  

  return (
    <div
      class="container vh-100 vw-100"
      style="background-image: linear-gradient(to bottom right, #ff99ff, #ffff66);"
    >
      <div class="box">
        <h2>Signin</h2>
        <form onSubmit={(e)=>handleLogin(e)}>
          <div class="inputbox">
            <input
              id="user"
              type="text"
              value={userName()}
              onInput={(e) => setUserName(e.target.value)}
              required
            />
            <label for="user">
              <i class="fas fa-user me-2"></i>工號
            </label>
          </div>
          <div class="inputbox">
            <input
              id="pswd"
              type="password"
              value={passWord()}
              onInput={(e) => setPassWord(e.target.value)}
              required
            />
            <label for="pswd">
              <i class="fas fa-key me-2"></i>密碼
            </label>
          </div>
          <input
            class="w-100 fs-3"
            type="submit"
            name=""
            value="送出"
          />
        </form>
      </div>
      <Toaster/>
    </div>
    
  );
}

export default Login;

// const handleLogin  = (e) => {
//   e.preventDefault();

//   // 模拟验证用户凭据
//   if (username() === 'admin' && password() === 'password') {
//         localStorage.setItem('auth', 'true');
//       onLogin(username());
//       navigate('/', { replace: true });
//   } else {
//       alert('Invalid username or password');
//   }
// };
