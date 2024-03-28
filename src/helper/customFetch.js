//import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();
const baseURL = import.meta.env.VITE_VERCEL_URL;

async function customFetch(url, options = {}) {
  // console.log("baseURL", process.env.VITE_VERCEL_URL);
  const localAccessToken = localStorage.getItem("localAccessToken"); // token儲存在localStorage
  const updatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localAccessToken}`,
      // Authorization:  localAccessToken,
    },
    credentials: "include", // 確保cookie被發送
  };
  let response = await fetch(baseURL + url, updatedOptions);
  console.log("response :", response);
  //   let resJson =await response.json();

  //  console.log("resJson :", resJson);
  if (response.status == 401) {
    console.log("not ok response :", response);
    localStorage.setItem("localAccessToken", "");

    const refreshResponse = await fetch(
      `${process.env.VERCEL_URL}/api/auth/refresh`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 確保cookie被發送
      }
    );
    console.log("refreshResponse: ", refreshResponse);
    console.log("refreshResponse json: ", await refreshResponse.json());
    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      // 更新localStorage中的accessToken
      localStorage.setItem("localAccessToken", accessToken);
      console.log("New accessToken", accessToken);
      // 使用新的 accessToken 重試發出請求()
      updatedOptions.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, updatedOptions); // 使用新的 accessToken 請求回應

      // location.href = "/login";
      // return Promise.reject({
      //   redirect: "/login",
      //   msg: "重新登入 ",
      // });
    } else {
      // 更新 refreshToken refresh failed ，跳轉到 login 頁面
      return Promise.reject({
        redirect: "/login",
        msg: " refreshToken refresh failed，重新登入",
      });

      return response; // 返回原始請求回應(如果有)
    }
  }
}
export default customFetch;

//if (response.status == 401) {
//console.log("not ok response :", response);
// 嘗試刷新token
// const refreshResponse = await fetch(
//  `${process.env.VERCEL_URL}/api/auth/refresh`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include", // 確保cookie被發送
//   }
// );
// console.log("refreshResponse: ", refreshResponse);
// console.log("refreshResponse json: ", await refreshResponse.json());
// if (refreshResponse.ok) {
//   const { accessToken } = await refreshResponse.json();
//   // 更新localStorage中的accessToken
//   localStorage.setItem("localAccessToken", accessToken);
//   console.log("New accessToken", accessToken);
//   // 使用新的 accessToken 重試發出請求()
//   updatedOptions.headers.Authorization = `Bearer ${accessToken}`;
//   response = await fetch(url, updatedOptions); // 使用新的 accessToken 請求回應
// } else {
//   // 更新 refreshToken refresh failed ，跳轉到 login 頁面
//   return Promise.reject({
//     redirect: "/login",
//     msg: " refreshToken refresh failed ",
//   });

// }
//}
