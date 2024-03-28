import { createEffect, createSignal, Show } from 'solid-js';

function AlertComponent() {
  const [showAlert, setShowAlert] = createSignal({
    type:'warning',
    isShow:false,
    message:'',
  });

  const closeAlert = () => setShowAlert({ ...showAlert(), isShow: false });

  // 添加一個副作用，當警告顯示時啟動計時器
  createEffect(() => {
    let timer;
    if (showAlert().hasShow) {
      // 設置一個定時器，在一定時間後自動隱藏警告
      timer = setTimeout(() => {
        setShowAlert(false);
      }, props.duration || 5000); // 默認持續時間為5000毫秒（5秒）
    }

    // 在組件卸載時清除計時器
    return () => clearTimeout(timer);
  });

  return (
    <Show when={showAlert().isShow}>
      <div class={`alert alert-${showAlert().type || 'warning'} alert-dismissible fade show`} role="alert">
        {showAlert().message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}></button>
      </div>
    </Show>
  );
}

export default AlertComponent;
