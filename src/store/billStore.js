import { createSignal, createMemo, createRoot, createEffect } from "solid-js";
/**we can build a global reactive data store by creating a signal in a global scope, and exporting it for other modules to use:  */
function createBills() {
  const [bills, setBills] = createSignal([]);
  // const [hasChange, setHasChange] = createSignal(true);
  const [editBill, setEditBill] = createSignal({});
  //const [isPopupVisible, setIsPopupVisible] = createSignal(false);
  const [iceEdit, setIceEdit] = createSignal("");
  const [moodEdit, setMoodEdit] = createSignal("");
  const [sizeEdit, setSizeEdit] = createSignal("");
  const [sugarEdit, setSugarEdit] = createSignal("");
  const [quantityEdit, setQuantityEdit] = createSignal(1);

  createEffect(() => {
    console.log("bills Add", bills());
    //console.log("bills changed", editBill());
  });

  function revertBillData() {
    setEditBill(() => ({}));
  }

  return {
    bills,
    setBills,
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
    editBill,
    setEditBill,
    revertBillData,
  };
}

export default createRoot(createBills);
