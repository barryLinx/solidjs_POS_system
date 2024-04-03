import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
//import { useNavigate, useLocation } from "@solidjs/router";
import authStore from "../store/authStore";
import formatNumber from "../helper/formatNumber";
import customFetch from "../helper/customFetch";
import Pagination from "../components/pagination";
//import { invalidAccessTokenNotify } from "../helper/notifyToast";

function Home() {
  
  const { setStatusCode } = authStore;
  const [dailySales, setDailySales] = createSignal({});
  const [dataSales, setDataSales] = createSignal([]);

  // 分頁設定
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = createSignal(1);

  //const navigate = useNavigate();
  // const location = useLocation();

  const payEnum = {
    1: "現金",
    2: "信用卡",
    3: "電子支付",
  };

  const statusEnum = {
    1: "完成",
    2: "等待中",
    3: "取消",
  };

  const statusColorEnum = {
    1: "text-bg-success",
    2: "text-bg-warning",
    3: "text-bg-danger",
  };

  createEffect(() => {
    (async () => {
      // if (!localAccessToken()) {
      //   navigate("/login", { replace: true });
      //   return;
      // }
      const response = await customFetch("api/getSalesData", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Home response", response);

      if (response.status == 441) {
        setStatusCode(441);
        // navigate("/", { replace: true });
        return;
      }
      const jsonData = await response.json();
      console.log("Home jsonData", jsonData);

      setDailySales(jsonData);
      setDataSales(jsonData?.dailySales);
      console.log("Home dailySales", dataSales());
    })();
  });
  
  const dataPages = Array.from({ length: dataSales().length }, (_, index) => `Item ${index + 1}`);

  const paginatedData = createMemo(() =>
    dataSales().slice(
      (currentPage() - 1) * itemsPerPage,
      currentPage() * itemsPerPage
    )
  );

  return (
    <div
      class=" col-md-11 position-relative vh-100"
      style="background-color: #EEEDF3;"
    >
      <div class="row mt-4 g-3">
        <div class="col-md-4">
          <div class="d-flex p-3 justify-content-between align-items-center bg-light">
            <div class="fw-bold text-primary">
              <h2 class="">{formatNumber(dailySales()?.daily?.customer)}</h2>
              <span class="text-secondary">每日顧客</span>
            </div>
            <div class="fs-1 text-primary">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="d-flex p-3 justify-content-between align-items-center bg-light">
            <div class="fw-bold text-primary">
              <h2 class="">{formatNumber(dailySales()?.daily?.sales)}</h2>
              <span class="text-secondary fw-">銷售數量</span>
            </div>
            <div class="fs-1 text-primary">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex p-3 justify-content-between align-items-center bg-light">
            <div class="fw-bold text-primary">
              <h2 class="">
                {formatNumber(dailySales()?.daily?.volumeOfBusiness)}
              </h2>
              <span class="text-secondary ">當日營業額</span>
            </div>
            <div class="fs-1 text-primary">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div class="p-3 d-flex flex-column justify-content-between">
          <div class="p-3 d-flex justify-content-between bg-light">
            <h2>當日銷售項目</h2>
            {/* <button class="btn btn-outline-primary">查看全部</button> */}
          </div>
          <div class="scorllbar" style="height:600px;">
            <table class=" table table-hover table-light p-3 sticky-top top-0">
              <thead class="position-sticky top-0">
                <tr class="bg-primary">
                  <th class="fs-3 text-primary" scope="col">
                    名稱
                  </th>
                  <th class="fs-3 text-primary" scope="col">
                    價錢
                  </th>
                  <th class="fs-3 text-primary" scope="col">
                    付款方式
                  </th>
                  <th class="fs-3 text-primary" scope="col">
                    狀況
                  </th>
                </tr>
              </thead>
              <tbody>
                <For each={paginatedData()}>
                  {/* <For each={dailySales()?.dailySales}> */}
                  {(sales, i) => (
                    <>
                      <tr>
                        <th class="fs-4" scope="row">
                          {sales.name}
                        </th>
                        <td class="fs-4 fw-bold">{sales.price}</td>
                        <td class="fs-4 fw-bold">{payEnum[sales.payMethed]}</td>
                        <td>
                          <span
                            class={`fs-5 badge ${
                              statusColorEnum[sales.status]
                            }`}
                          >
                            {statusEnum[sales.status]}
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                </For>
                <Show when={!dailySales()?.dailySales}>
                  {[...Array(10)].map((_, i) => (
                    <tr class="placeholder-glow">
                      <th class="fs-4" scope="row">
                        <span class="placeholder col-6"></span>
                      </th>
                      <td class="fs-4 fw-bold">
                        <span class="placeholder col-6"></span>
                      </td>
                      <td class="fs-4 fw-bold">
                        <span class="placeholder col-6"></span>
                      </td>
                      <td>
                        <span class="placeholder col-6"></span>
                      </td>
                    </tr>
                  ))}
                </Show>
              </tbody>
            </table>
          </div>
          <div class="col-md">
            <Pagination
              totalItems={dataSales().length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage()}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
