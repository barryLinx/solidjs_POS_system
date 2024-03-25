import { For, Show, createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import authStore from "../store/authStore";
import formatNumber from "../helper/formatNumber";
import customFetch from "../helper/customFetch";

function Home() {
  const { localAccessToken, userName ,setLocalAccessToken} = authStore;
  const [dailySales, setDailySales] = createSignal({});
  const navigate = useNavigate();

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

  createEffect(async () => {
    
      if(!localAccessToken()){
        return;
      }
      const response = await customFetch("api/getSalesData", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Home response", response);

      const jsonData = await response.json();
      console.log("Home jsonData", jsonData);
      setDailySales(jsonData);

// try {
      // console.log("dailySales",dailySales());
    // } catch (error) {
    //   console.error("Failed to fetch daily sales data:", error);
    //   localStorage.setItem("localAccessToken", "");
    //   setLocalAccessToken('');
    //   navigate("/*404", { replace: true });
    //   //navigate("/login", { replace: true });
    // }

    //salesData
  });

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
                <For each={dailySales()?.dailySales}>
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

                <tr>
                  <th class="fs-4" scope="row">
                    冰淇淋
                  </th>
                  <td class="fs-4 fw-bold">80</td>
                  <td class="fs-4 fw-bold">電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">黑咖啡拿鐵</th>
                  <td>75</td>
                  <td>信用卡</td>
                  <td>
                    <span class="fs-5 badge text-bg-success">完成</span>
                  </td>
                </tr>
                <tr>
                  <th class="fs-4" scope="row">
                    巧克力
                  </th>
                  <td class="fs-4 fw-bold">20</td>
                  <td class="fs-4 fw-bold">現金</td>
                  <td>
                    <span class="fs-5 badge text-bg-warning">等待中</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">冰淇淋</th>
                  <td>80</td>
                  <td>電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">黑咖啡拿鐵</th>
                  <td>75</td>
                  <td>信用卡</td>
                  <td>
                    <span class="fs-5 badge text-bg-success">完成</span>
                  </td>
                </tr>
                <tr>
                  <th class="fs-4" scope="row">
                    巧克力
                  </th>
                  <td class="fs-4 fw-bold">20</td>
                  <td class="fs-4 fw-bold">現金</td>
                  <td>
                    <span class="fs-5 badge text-bg-warning">等待中</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">冰淇淋</th>
                  <td>80</td>
                  <td>電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">黑咖啡拿鐵</th>
                  <td>75</td>
                  <td>信用卡</td>
                  <td>
                    <span class="fs-5 badge text-bg-success">完成</span>
                  </td>
                </tr>
                <tr>
                  <th class="fs-4" scope="row">
                    巧克力
                  </th>
                  <td class="fs-4 fw-bold">20</td>
                  <td class="fs-4 fw-bold">現金</td>
                  <td>
                    <span class="fs-5 badge text-bg-warning">等待中</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">冰淇淋</th>
                  <td>80</td>
                  <td>電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th class="fs-4" scope="row">
                    巧克力
                  </th>
                  <td class="fs-4 fw-bold">20</td>
                  <td class="fs-4 fw-bold">現金</td>
                  <td>
                    <span class="fs-5 badge text-bg-warning">等待中</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">冰淇淋</th>
                  <td>80</td>
                  <td>電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">黑咖啡拿鐵</th>
                  <td>75</td>
                  <td>信用卡</td>
                  <td>
                    <span class="fs-5 badge text-bg-success">完成</span>
                  </td>
                </tr>
                <tr>
                  <th class="fs-4" scope="row">
                    巧克力
                  </th>
                  <td class="fs-4 fw-bold">20</td>
                  <td class="fs-4 fw-bold">現金</td>
                  <td>
                    <span class="fs-5 badge text-bg-warning">等待中</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">冰淇淋</th>
                  <td>80</td>
                  <td>電子支付</td>
                  <td>
                    <span class="fs-5 badge text-bg-danger">取消</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">黑咖啡拿鐵</th>
                  <td>75</td>
                  <td>信用卡</td>
                  <td>
                    <span class="fs-5 badge text-bg-success">完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
