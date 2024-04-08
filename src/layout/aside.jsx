import { createMemo, For, createSignal ,lazy} from "solid-js";
import authStore from "../store/authStore";
import billStore from "../store/billStore";
import formatNumber from "../helper/formatNumber";
// import BillCard from "../components/billCard";
// import NoteDialogsModel from "../components/noteDialogsModel";
const NoteDialogsModel =lazy(() => import("../components/noteDialogsModel"));
const BillCard = lazy(() => import("../components/billCard"));
import { checkoutPayNotify,billsIsEmptyNotify } from "../helper/notifyToast";

function aside() {
  const { userName } = authStore;
  const { bills,editBill,setBills } = billStore;
  const [moneyComputed, setMoneyComputed] = createSignal(0);
  const [current, setCurrent] = createSignal('cash');

  const Subtotal = createMemo(() => {
    const total = bills().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setMoneyComputed(total);
    return total;
  });

  const checkoutPay = () => { 
    if(bills().length === 0){
      billsIsEmptyNotify();
      return;
    }
    setBills([]);
    checkoutPayNotify();
  }

  return (
    <>
    <div class="col-md-3" style="background-color: #f2f2f2f2;">
      {/* <!--login --> */}
      <div class="p-3 mt-4 mx-0 d-flex justify-content-between align-items-center bg-white  rounded-4">
        {/* <!-- Cashier login--> */}
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="https://placehold.co/600x400"
            class="object-fit-cover rounded-4 me-3"
            style="width: 70px; height: 70px;"
          />
          <div class="d-block'">
            <span class="d-block">
              <small class="fs-6">收銀員</small>
            </span>
            <span class="fs-6">{userName()} &#128512; </span>
          </div>
        </div>
        {/* <!-- Cashier End--> */}
        <button
          type="button"
          class="far fa-bell fs-1 p-0 bg-white border-0 position-relative"
        >
          <span class="p-1 w-0 h-0 position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle">
            <span class=""></span>
          </span>
        </button>
      </div>
      {/* <!-- Login End--> */}
      {/* <!--Bill--> */}
      <h2 class="mt-5 mb-5">結帳</h2>
      <div id="billScroll" class="scorllbar" style="height: 15rem; ">
        <div class="row  gy-3 flex-column align-items-center">
          <For each={bills()}>
            {(bill, i) => (
              <>
              <BillCard billData={bill}/>
              
              </>
            )}
          </For>
        </div>
      </div>
      {/* <!--Bill End--> */}
      {/* <!--subTatal--> */}
      <div class="mt-5 d-flex justify-content-between">
        <b class="fs-6">Subtotal</b>
        <b class="fs-6">
          <sup>NT</sup>
          {formatNumber(Subtotal())}
        </b>
      </div>
      <div
        class="mt-3 mb-1 d-flex justify-content-between"
        style="color: #8c8c8c;"
      >
        <b class="fs-6">Tax(10%)</b>
        <b class="fs-6">
          <sup>NT</sup>
          {formatNumber((moneyComputed() * 0.1).toFixed(2))}
        </b>
      </div>

      <hr class="mb-2 dashed" />
      <div class="mb-4 d-flex justify-content-between">
        <b class="fs-5">Total</b>
        <b class="fs-4">
          <sup>NT</sup>
          {formatNumber(
            Math.round(moneyComputed() + moneyComputed() * 0.1).toFixed(1)
          )}
          {}
        </b>
      </div>
      {/* <!--subTatal End-->
    <!-- Payment --> */}
      <h2 class="mt-5 mb-3">付款方式</h2>
      <div calss="mt-5">
        <button
          class="btn btn-outline-primary d-inline-flex flex-column align-items-center py-2 px-2 me-3"
          style="height: 5.5rem; width: 5.5rem;"
          classList={{ active: current() === 'cash' }}
          onClick={()=>setCurrent('cash')}
        >
          <i class="fs-1 mb-2 fas fa-money-bill-alt"></i>
          <b class="fs-5 text-nowrap">現金</b>
        </button>
        <button
          class="btn btn-outline-primary d-inline-flex flex-column align-items-center py-2 px-2 me-3"
          style="height: 5.5rem; width: 5.5rem;"
          classList={{ active: current() === 'credit' }}
          onClick={()=>setCurrent('credit')}
        >
          <i class="fs-1 mb-2 far fa-credit-card "></i>
          <b class="fs-5 text-nowrap">信用卡</b>
        </button>
        <button
          class="btn btn-outline-primary d-inline-flex flex-column align-items-center py-2 px-2 "
          style="height: 5.5rem; width: 5.5rem;"
          classList={{ active: current() === 'payOnline' }}
          onClick={()=>setCurrent('payOnline')}
        >
          <i class="fs-1 mb-2 fas fa-wallet "></i>
          <b class="fs-5 text-nowrap ">電子支付</b>
        </button>
      </div>
      {/* <!-- Payment End--> */}

      <button class="mt-4 btn btn-primary d-block w-100 fs-4"
      onClick={()=>checkoutPay()}
      >列印帳單</button>
    </div>
    <NoteDialogsModel/>
    </>
    
  );
}

export default aside;
