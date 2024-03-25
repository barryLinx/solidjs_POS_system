import { createEffect, createSignal, For, createMemo } from "solid-js";
import Asidebar from "../layout/aside";
//import billStore from "../store/billStore";
//import { useNavigate } from "@solidjs/router";

import customFetch from "../helper/customFetch";
import authStore from "../store/authStore";
import MenuCard from '../components/menuCard'

function menu() {
  const { localAccessToken, userName, setLocalAccessToken } = authStore;
  //const { setBills, bills } = billStore;
  const [menuData, setMenuData] = createSignal([]);
  const [current, setCurrent] = createSignal("all");
 // const [hasSelect, setHasSelect] = createSignal("");
  const [categorys, setCategorys] = createSignal([
    { name: "coffee", icon: "fas fa-coffee" },
    { name: "juice", icon: "fas fa-wine-glass-alt" },
    { name: "drink", icon: "fas fa-wine-bottle" },
    { name: "pizza", icon: "fas fa-pizza-slice" },
    { name: "sandwich", icon: "fas fa-hamburger" },
    { name: "dessert", icon: "fas fa-stroopwafel" },
  ]);


  function capitalizeFirstLetter(capitalizeText = "") {
    return capitalizeText.charAt(0).toUpperCase() + capitalizeText.slice(1);
  }

  const categoryEnum = {
    1: "coffee",
    2: "juice",
    3: "drink",
    4: "pizza",
    5: "sandwich",
    6: "dessert",
  };

  createEffect(async () => {
    if (!localAccessToken()) {
      return;
    }
    const response = await customFetch("api/getMenuData", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();
    console.log(" Menu response", response);
    console.log("Menu jsonData", jsonData);
    // 更新資料
    setMenuData(jsonData);
    //   try {
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   localStorage.setItem("localAccessToken", "");
    //   setLocalAccessToken('');
    //   navigate("/*404", { replace: true });
    // }
  });

  const filterCategory = createMemo(() => {
    //Specify
    console.log("current():", current());
    // 直接返回所有数据，如果当前选中的是 "all"
    if (current() == "all") {
      return menuData();
    }
    // 使用 filter 函数来過濾 menuData，根據當前選中的分類
    let categoryData = menuData().filter((option) => {
      // 檢查当前選项的分類是否與選中的分類匹配
      //console.log("option():", option());
      return categoryEnum[option.categroy] == current();
    });

    // 返回過濾後的數组
    return categoryData;
  });


  function addToBillsHandler(category) {
    // console.log("mood", mood());
    // console.log("size", size());
    // console.log("sugar", sugar());
    // console.log("ice", ice());
    if (!mood() || !sugar() || !size() || !ice()) {
      alert("Please select mood, size, sugar, ice");
      return;
    }
   
    setBills((currentBills) => {     
        // 將其累加到清單中
        return [
          ...currentBills,
          {
            id: category.id,
            name: category.name,
            price: category.price,
            quantity: 1,
            imgUrl: category.imgUrl,
            mood: mood(),
            size: size(),
            sugar: sugar(),
            ice: ice(),
          },
        ];
    });
  }


  return (
    <>
      <div
        class="col-md-8 position-relative"
        style="background-color: #EEEDF3;"
      >
        <div id="simple">
          {/* <!-- Choose search--> */}
          <div class="row mt-5">
            <div class="col-md-6">
              <h2 class="fw-bold ">Choose Category</h2>
            </div>
            <div class="col-md-6">
              <div class="input-group flex-nowrap ">
                <input
                  id="search"
                  type="text"
                  class="form-control fs-4"
                  placeholder="Search Category or menu"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                />
                <span class="input-group-text fs-4" id="addon-wrapping">
                  <label for="search" class="fas fa-search"></label>
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Choose search End--> */}
          {/* <!-- Category-wrap --> */}
          <div class="mt-5 d-flex justify-content-between align-content-center">
            <a
              class="rounded-5 btn btn-outline-primary d-flex flex-column align-content-between w-25 h-25 me-3 py-3 active"
              href="#"
              onClick={() => setCurrent("all")}
              classList={{ active: current() === "all" }}
            >
              <i class="fas fa-utensils fs-2"></i>
              <span class="mt-2 fs-5">all</span>
            </a>
            <For each={categorys()}>
              {(category, i) => (
                <a
                  class="rounded-5 btn btn-outline-primary d-flex flex-column align-content-between w-25 h-25 me-3 py-3"
                  href="#"
                  onClick={() => setCurrent(category.name)}
                  classList={{ active: current() === category.name }}
                >
                  <i class={`${category.icon} fs-2`}></i>
                  <span class="mt-2 fs-5">{category.name}</span>
                </a>
              )}
            </For>
          </div>
          {/* <!-- Category End--> */}
          {/* <!-- Menu header--> */}
          <div class="row mt-5">
            <div class="col-6 ">
              <h3 class="fw-bold align-middle">
                {capitalizeFirstLetter(current())} Menu
              </h3>
            </div>
            <div class="col-6 test-end">
              <p class="text-end align-middle fs-4">
                {filterCategory().length}  {capitalizeFirstLetter(current())} <span>Result</span>
              </p>
            </div>
          </div>
          {/* <!-- Menu header End--> */}
        </div>
        {/* <!--Menu content --> */}
        <div id="menu" class="scorllbar" style="height:610px; ">
          <div class="row gy-3 gx-3">
            {/* <For each={filterCategory()}>
                {(category, i) => (  </For> */}
            <For each={filterCategory()}>
              {(category, i) => (
                <MenuCard categoryData={category} addToBills={addToBillsHandler} />                
              )}
            </For>
            {/* <!-- Card --> */}
            <div class="card-wrap d-flex flex-column p-4 bg-light rounded-5">
              {/* <!--Card-header--> */}
              <div class=" d-flex align-items-md-start">
                <div class="img-wrap me-3">
                  <img
                    class="rounded-5 object-fit-cover"
                    style="height: 10rem; width: 8rem;"
                    src="https://placehold.co/900x1000"
                    alt=""
                  />
                </div>
                <div class="info" style="width: 12rem;">
                  <h4 class="text-wrap">Hot Pizza.</h4>
                  <p class="text-ellipsis">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <p class="fs-4">
                    <sup>NT</sup>35.6
                  </p>
                </div>
              </div>
              {/* <!--Card-header End--> */}
              {/* <!--  Card-body--> */}
              <div class="body-content row mt-4">
                <div class="mood col-md-6 mb-5">
                  <h3 class="mb-2">Mood</h3>
                  <button type="button" class="btn">
                    <span class="fire fab fa-hotjar text-danger fs-3 rounded-circle"></span>
                  </button>
                  <button type="button" class="btn">
                    <span class="icecube far fa-snowflake text-info fs-3  rounded-circle"></span>
                  </button>
                </div>
                <div class="size col-md-6 mb-5">
                  <h3>Size</h3>
                  <button
                    class="btn rounded-circle bg-gray-1 me-1 text-center"
                    style="width: 2.5rem; height: 2.5rem;"
                  >
                    <span class="fw-bold fs-5">S</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1 me-1 text-center"
                    style="width: 2.5rem; height: 2.5rem;"
                  >
                    <span class="fw-bold fs-5">M</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1 me-1 text-center"
                    style="width: 2.5rem; height: 2.5rem;"
                  >
                    <span class="fw-bold fs-5">L</span>
                  </button>
                </div>
                <div class="sugar col-md-6">
                  <h3 class="mb-4">Sugar</h3>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class="fs-6 fw-bold text-warning ">30%</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class="fs-6 fw-bold">50%</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class="fs-6 fw-bold text-danger">70%</span>
                  </button>
                </div>
                <div class="ice col-md-6">
                  <h3 class="mb-4">Ice</h3>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class=" text-warning fw-bold">30%</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class="fw-bold">50%</span>
                  </button>
                  <button
                    class="btn rounded-circle bg-gray-1"
                    style="width: 3rem; height: 3rem;"
                  >
                    <span class="fw-bold text-danger">70%</span>
                  </button>
                </div>
              </div>
              {/* <!--  Card-body End--> */}
              <div class="mt-5">
                <button class="w-100 rounded-3 py-3 fs-4 fw-bold btn btn-primary text-light">
                  加入購買清單
                </button>
              </div>
            </div>
            {/* <!-- Card End--> */}
          </div>
        </div>
        {/* <!--Menu content --> */}
      </div>
      <Asidebar />
    </>
  );
}
export default menu;





// // 檢查購物清單中是否已經有這個項目
// const existingIndex = currentBills.findIndex(
//   (bill) => bill.name === category.name
// );

// if (existingIndex !== -1) {
//   // 如果項目已存在，複製當前清單開增加該項目的數量
//   return currentBills.map((bill, index) => {
//     if (index === existingIndex) {
//       return {
//         ...bill,
//         quantity: bill.quantity + 1,
//         mood: mood(),
//         size: size(),
//         sugar: sugar(),
//         ice: ice(),
//       };
//     }
//     console.log("bills", bills);
//     return bill;
//   });
// } else {
//   // 如果項目不存在，將其添加到清單中
//   return [
//     ...currentBills,
//     {
//       id: category.id,
//       name: category.name,
//       price: category.price,
//       quantity: 1,
//       imgUrl: category.imgUrl,
//       mood: mood(),
//       size: size(),
//       sugar: sugar(),
//       ice: ice(),
//     },
//   ];
// }
// });