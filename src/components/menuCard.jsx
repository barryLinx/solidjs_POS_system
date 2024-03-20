import { createSignal } from "solid-js"
import formatNumber from "../helper/formatNumber";
import billStore from "../store/billStore";

function menuCard({categoryData,addToBills}) {
  const { setBills, bills } = billStore;
  const [moodId, setMoodId] = createSignal("");
  const [sizeId, setSizeId] = createSignal("");
  const [suagarId, setSugarId] = createSignal("");
  const [iceId, setIceId] = createSignal("");

  const [mood, setMood] = createSignal("");
  const [size, setSize] = createSignal("");
  const [sugar, setSugar] = createSignal("");
  const [ice, setIce] = createSignal("");

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
            id: currentBills.length + 1,
            name: category.name,
            describe: category.describe,
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
    setMoodId("");
    setSizeId("");
    setSugarId("");
    setIceId("");
    setMood("");
    setSize("");
    setSugar("");
    setIce("");
  }
  return (
    <>
      <div class="col-md-6 btnOption">
        <div class="card-wrap d-flex flex-column p-4 bg-light rounded-5">
          <div class=" d-flex align-items-md-start">
            <div class="img-wrap me-3">
              <img
                class="rounded-5 object-fit-cover"
                style="height: 10rem; width: 8rem;"
                src={categoryData.imgUrl}
                alt=""
              />
            </div>
            <div class="info" style="width: 12rem;">
              <h4 class="text-wrap">{categoryData.name}.</h4>
              <p class="text-ellipsis">{categoryData.describe}</p>
              <p class="fs-4">
                <sup>NT</sup>
                {formatNumber(categoryData.price)}
              </p>
            </div>
          </div>
          <div class="body-content row mt-4">
            <div class="mood col-md-6 mb-5">
              <h3 class="mb-2">Mood</h3>
              <button
                id={`btnMoodFire${categoryData.id}`}
                type="button"
                class="btn"
                classList={{
                  "btn-primary active":
                    `${moodId()}` === `btnMoodFire${categoryData.id}`,
                }}
                onClick={() => {
                  setMoodId(`btnMoodFire${categoryData.id}`);
                  // setCurrentItemId(category.id);
                  setMood("熱");
                }}
              >
                <span class="fire fab fa-hotjar text-danger fs-3 rounded-circle"></span>
              </button>
              <button
                id={`btnMoodIcecube${categoryData.id}`}
                type="button"
                class="btn"
                classList={{
                  "btn-primary active":
                    `${moodId()}` === `btnMoodIcecube${categoryData.id}`,
                }}
                onClick={() => {
                  setMoodId(`btnMoodIcecube${categoryData.id}`);
                  //setCurrentItemId(`btnMoodFire${category.id}`);
                  setMood("冰");
                }}
              >
                <span class="icecube far fa-snowflake text-info fs-3  rounded-circle"></span>
              </button>
            </div>
            <div class="size col-md-6 mb-5">
              <h3>Size</h3>
              <button
                id={`btnSizeSmall${categoryData.id}`}
                class="btn rounded-circle bg-gray-1 me-1 text-center "
                classList={{
                  "btn-primary active":
                    `${sizeId()}` === `btnSizeSmall${categoryData.id}`,
                }}
                style="width: 2.5rem; height: 2.5rem;"
                onClick={() => {
                  setSizeId(`btnSizeSmall${categoryData.id}`);
                  setSize("Small");
                }}
              >
                <span class="fw-bold fs-5">S</span>
              </button>
              <button
                id={`btnSizeMeddle${categoryData.id}`}
                class="btn rounded-circle bg-gray-1 me-1 text-center"
                classList={{
                  "btn-primary active":
                    `${sizeId()}` === `btnSizeMeddle${categoryData.id}`,
                }}
                style="width: 2.5rem; height: 2.5rem;"
                onClick={() => {
                  setSizeId(`btnSizeMeddle${categoryData.id}`);
                  setSize("Middle");
                }}
              >
                <span class="fw-bold fs-5">M</span>
              </button>
              <button
                id={`btnSizeLarge${categoryData.id}`}
                class="btn rounded-circle bg-gray-1 me-1 text-center"
                classList={{
                  "btn-primary active":
                    `${sizeId()}` === `btnSizeLarge${categoryData.id}`,
                }}
                style="width: 2.5rem; height: 2.5rem;"
                onClick={() => {
                  setSizeId(`btnSizeLarge${categoryData.id}`);
                  setSize("Large");
                }}
              >
                <span class="fw-bold fs-5">L</span>
              </button>
            </div>
            <div class="suagar col-md-6">
              <h3 class="mb-4">Suagar</h3>
              <button
                id={`btnSuagar30${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${suagarId()}` === `btnSuagar30${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setSugarId(`btnSuagar30${categoryData.id}`);
                  setSugar("30%");
                }}
              >
                <span class="fs-6 fw-bold text-warning ">30%</span>
              </button>
              <button
                id={`btnSuagar50${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${suagarId()}` === `btnSuagar50${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setSugarId(`btnSuagar50${categoryData.id}`);
                  setSugar("50%");
                }}
              >
                <span class="fs-6 fw-bold">50%</span>
              </button>
              <button
                id={`btnSuagar70${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${suagarId()}` === `btnSuagar70${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setSugarId(`btnSuagar70${categoryData.id}`);
                  setSugar("70%");
                }}
              >
                <span class="fs-6 fw-bold text-danger">70%</span>
              </button>
            </div>
            <div class="ice col-md-6">
              <h3 class="mb-4">Ice</h3>
              <button
                id={`btnIce30${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${iceId()}` === `btnIce30${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setIceId(`btnIce30${categoryData.id}`);
                  setIce("30%");
                }}
              >
                <span class=" text-warning fw-bold">30%</span>
              </button>
              <button
                id={`btnIce50${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${iceId()}` === `btnIce50${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setIceId(`btnIce50${categoryData.id}`);
                  setIce("50%");
                }}
              >
                <span class="fw-bold">50%</span>
              </button>
              <button
                id={`btnIce70${categoryData.id}`}
                class="btn rounded-circle bg-gray-1"
                classList={{
                  "btn-primary active":
                    `${iceId()}` === `btnIce70${categoryData.id}`,
                }}
                style="width: 3rem; height: 3rem;"
                onClick={() => {
                  setIceId(`btnIce70${categoryData.id}`);
                  setIce("70%");
                }}
              >
                <span class="fw-bold text-danger">70%</span>
              </button>
            </div>
          </div>

          <div class="mt-5">
            <button
              class="w-100 rounded-3 py-3 fs-4 fw-bold btn btn-primary text-light"
              onClick={() => addToBillsHandler(categoryData)}
            >
              加入購買清單
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default menuCard;