import toast from "solid-toast";

//<Toaster/> 放在 RouteGuard.jsx

const addAlertNotify = () =>
  toast.error("請選擇 mood, size, sugar, ice", {
    duration: 2000,
    position: "top-center",
  });

const loginErrorNotify = () =>
  toast.error("請檢查密碼或帳號", {
    duration: 2000,
    position: "top-center",
  });

const invalidAccessTokenNotify = () =>
  toast.error("已經逾時,請重新登入", {
    duration: 2000,
    position: "top-center",
  });

const changeFailedNotify = () =>
  toast.error("已經逾時,請重新登入", {
    duration: 2000,
    position: "top-center",
  });
const checkoutPayNotify = () =>
  toast.success("開始列印", {
    duration: 2000,
    position: "top-center",
  });

const addSuccesstNotify = () =>
  toast.success("加入成功", {
    duration: 2000,
    position: "top-center",
  });

const editSuccessNotify = () =>
  toast.success("已修改成功!", {
    duration: 2000,
    position: "top-center",
  });

const deleteNotify = () =>
  toast.success("已刪除!", {
    duration: 2000,
    position: "top-center",
  });

const notAuthorized = () =>
  toast.error("You are not authorized to access this page", {
    duration: 2000,
    position: "top-center",
  });

export {
  checkoutPayNotify,
  changeFailedNotify,
  invalidAccessTokenNotify,
  loginErrorNotify,
  addAlertNotify,
  addSuccesstNotify,
  editSuccessNotify,
  deleteNotify,
  notAuthorized,
};
