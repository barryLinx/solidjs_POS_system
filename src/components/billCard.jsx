import { createSignal } from "solid-js";
import billStore from "../store/billStore";

function billCards({ billData }) {
  const {
    editBill,
    setEditBill,
    setIceEdit,
    setSizeEdit,
    setMoodEdit,
    setSugarEdit,
    setQuantityEdit,
  } = billStore;



  function editBillhandle() {
    let { mood, ice, size, sugar, quantity } = billData;
    setIceEdit(ice);
    setMoodEdit(mood);
    setSizeEdit(size);
    setSugarEdit(sugar);
    setQuantityEdit(quantity);
    //.log("billData", billData);
    setEditBill((bill) => ({ ...bill, ...billData }));


    console.log("editBill", editBill());
  }

  return (
    <>
      <div class="col-md">
        {/* <!-- porduct Box--> */}
        <div class="d-flex justify-content-start">
          {/* <!--porduct img--> */}
          <div class="me-2">
            <img
              class="object-fit-cover rounded-4"
              src={billData.imgUrl}
              style="width: 65px; height: 55px;"
            />
          </div>
          {/* <!--porduct img End--> */}
          <div class="d-flex flex-column me-1">
            <p class="ms-2 mb-1 fw-bold">{billData.name}</p>
            <p class="ms-2 fs-6 d-flex justify-content-between">
              <span class="me-3">
                {" "}
                &#215;&nbsp; <b>{billData.quantity}</b>
              </span>
              <button
                class="p-2 me-4 badge text-primary bg-light border-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => editBillhandle()}
                
              >
                notes <i class="fas fa-pencil-alt"></i>
              </button>
              {/* <span class="fw-bold fs-5 text-secondary">
            <sup>NT</sup>
            {bill.price}
          </span> */}
            </p>
          </div>
          {/* <!-- price --> */}
          <div class="d-flex justify-content-center align-items-center fw-bold fs-5 text-secondary">
            <span class="fw-bold fs-5 text-secondary">
              <sup>NT</sup>
              {billData.price}
            </span>
          </div>
          {/* <!-- price End--> */}
        </div>
        {/* <!-- porduct Box End--> */}
      </div>
     
    </>
  );
}

export default billCards;
