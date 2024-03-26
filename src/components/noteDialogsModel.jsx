import { createMemo, createEffect, createSignal } from "solid-js";

import billStore from "../store/billStore";
import {editSuccessNotify,deleteNotify} from '../helper/notifyToast';


function noteDialogsModel({ billEdit }) {
  const {
    setBills,
    editBill,
    iceEdit,
    setIceEdit,
    moodEdit,
    setMoodEdit,
    sizeEdit,
    setSizeEdit,
    sugarEdit,
    setSugarEdit,
    quantityEdit,
    setQuantityEdit,
  } = billStore;

  
  function deleteHandler() {
    setBills((currentBills) => {
      const index = currentBills.findIndex((bill) => bill.id === billEdit.id);
      currentBills.splice(index, 1);
      return [...currentBills];
    });
    deleteNotify();
  }

  function saveHandler() {
    //let bId = billEdit.id;
   // console.log("editBill().id: ", editBill().id);
    if (quantityEdit() <= 0) {
      alert("數量不可為 0");
      return;
    }

    setBills((currentBills) => {
      return currentBills.map((bill) => {
        // 檢查當前的 bill 是否是我們需要更新的 bill
        if (bill.id === editBill().id) {
          // 如果是，則返回更新過的 changeBill
          return {
            ...bill, // 展開原有的 bill 屬性
            mood: moodEdit(), // 更新樣式
            size: sizeEdit(), // 更新大小
            sugar: sugarEdit(), // 更新糖量
            ice: iceEdit(), // 更新冰塊量
            quantity: quantityEdit(), // 更新數量
          };
        } else {
          // 如果不是，則原樣返回該 bill
          return bill;
        }
      });
    });
    editSuccessNotify();
  }

  return (
    <>
  
      <div
        class="modal fade popup"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered  modal-lg  modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h1 class="modal-title fs-3 " >
               商品
              </h1>
              <button
                type="button"
                class="btn btn-primary text-white p-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={() => revertBillData()}
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              {/* <!--Card--> */}
              <div class="card-wrap d-flex flex-column p-4 bg-light rounded-5">
                {/* <!--Card-header--> */}
                <div class=" d-flex justify-content-between align-items-md-start">
                  <div class="me-3 w-75 h-100">
                    <img
                      class="rounded-5 object-fit-cover w-75"
                      style="height: 12rem;"
                      src={billEdit.imgUrl}
                    />
                  </div>
                  <div class="info w-50">
                    <h4 class="text-wrap">{billEdit.name}</h4>
                    <p class="text-ellipsis">{billEdit.describe}</p>
                    <p class="fs-4">
                      <sup>NT</sup>
                      {billEdit.price}
                    </p>
                  </div>
                </div>
                {/* <!--Card-header End--> */}
                {/* <!--  Card-body--> */}
                <div class="body-content row mt-4">
                  <div class="mood col-md-6 mb-5">
                    <h3 class="mb-2">Mood</h3>
                    <button
                      type="button"
                      class="btn"
                      classList={{
                        "btn-primary active": moodEdit() === "熱",
                      }}
                      onClick={() => setMoodEdit("熱")}
                    >
                      <span class="fire fab fa-hotjar text-danger fs-3 rounded-circle"></span>
                    </button>
                    <button
                      type="button"
                      class="btn"
                      classList={{
                        "btn-primary active": moodEdit() === "冰",
                      }}
                      onClick={() => setMoodEdit("冰")}
                    >
                      <span class="icecube far fa-snowflake text-info fs-3  rounded-circle"></span>
                    </button>
                  </div>
                  <div class="size col-md-6 mb-5">
                    <h3>Size</h3>
                    <button
                      class="btn rounded-circle bg-gray-1 me-1 text-center"
                      classList={{
                        "btn-primary active": sizeEdit() === "Small",
                      }}
                      onClick={() => setSizeEdit("Small")}
                      style="width: 2.5rem; height: 2.5rem;"
                    >
                      <span class="fw-bold fs-5">S</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1 me-1 text-center"
                      classList={{
                        "btn-primary active": sizeEdit() === "Middle",
                      }}
                      onClick={() => setSizeEdit("Middle")}
                      style="width: 2.5rem; height: 2.5rem;"
                    >
                      <span class="fw-bold fs-5">M</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1 me-1 text-center"
                      classList={{
                        "btn-primary active": sizeEdit() === "Large",
                      }}
                      onClick={() => setSizeEdit("Large")}
                      style="width: 2.5rem; height: 2.5rem;"
                    >
                      <span class="fw-bold fs-5">L</span>
                    </button>
                  </div>
                  <div class="sugar col-md-6">
                    <h3 class="mb-4">Sugar</h3>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": sugarEdit() === "30%",
                      }}
                      onClick={() => setSugarEdit("30%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class="fs-6 fw-bold text-warning ">30%</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": sugarEdit() === "50%",
                      }}
                      onClick={() => setSugarEdit("50%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class="fs-6 fw-bold">50%</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": sugarEdit() === "70%",
                      }}
                      onClick={() => setSugarEdit("70%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class="fs-6 fw-bold text-danger">70%</span>
                    </button>
                  </div>
                  <div class="ice col-md-6">
                    <h3 class="mb-4">Ice</h3>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": iceEdit() === "30%",
                      }}
                      onClick={() => setIceEdit("30%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class=" text-warning fw-bold">30%</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": iceEdit() === "50%",
                      }}
                      onClick={() => setIceEdit("50%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class="fw-bold">50%</span>
                    </button>
                    <button
                      class="btn rounded-circle bg-gray-1"
                      classList={{
                        "btn-primary active": iceEdit() === "70%",
                      }}
                      onClick={() => setIceEdit("70%")}
                      style="width: 3rem; height: 3rem;"
                    >
                      <span class="fw-bold text-danger">70%</span>
                    </button>
                  </div>
                  <div class="quantity col-md-12 mt-3">
                    <h3 class="mb-4 mt-3">Quantity</h3>
                    <div
                      class="btn-group text-center"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => {
                          setQuantityEdit(quantityEdit() - 1);
                        }}
                        disabled={quantityEdit() == 1 || quantityEdit() <= 0}
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        class="form-control text-center"
                        value={quantityEdit() <=0 ? 1 : quantityEdit()}
                        onChange={(e) => setQuantityEdit(e.target.value)}
                      />
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => {
                          setQuantityEdit(quantityEdit() + 1);
                        }}
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <p class="text-danger">
                      {quantityEdit() < 1
                        ? "數量必須大於 0"
                        : ""}
                    </p>
                  </div>
                </div>
                {/* <!--  Card-body End--> */}
              </div>
              <div class="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => deleteHandler()}
                >
                  刪除
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => saveHandler()}
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default noteDialogsModel;

// const index=currentBills.findIndex(bill=>bill.id===billEdit.id);
//       const newBill={...billEdit};
//       currentBills[index]=newBill;
//       return [...currentBills];

// return bills.map((bill)=>{
//   if(bill.id===billEdit.id){
//     return billEdit;
//   }
//   return bill;
// })

// <input type="radio" name="mood" id="moodFire1" onChange={() => setMoodEdit('熱')}  />
// <label for="moodFire1" class="fire fab fa-hotjar text-danger fs-3 me-2 p-2 rounded-circle"
// classList={{
//   active: billEdit.mood === "熱",
// }}
// ></label>
// <input type="radio" name="mood" id="moodIce1" onChange={() => setMoodEdit('冰')}  />
// <label for="moodIce1" class="icecube far fa-snowflake text-info fs-3 p-2 rounded-circle"
//  classList={{
//   active: billEdit.mood === "冰",
// }}
// ></label>

{
  /* <input
                    type="number"
                    class="form-control"
                    value={quantityEdit()}
                    onChange={(e) => setQuantityEdit(e.target.value)}
                  />
                  <p class="text-danger">
                    {quantityEdit() < 1
                      ? "Quantity must be greater than 0"
                      : ""} 
                  </p>*/
}
