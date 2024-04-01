import { createEffect, createSignal, For, Show } from "solid-js";
import customFetch from "../helper/customFetch";
import authStore from "../store/authStore";
import {
  notAuthorized,
  editSuccessNotify,
  changeFailedNotify,
} from "../helper/notifyToast";
import { useNavigate } from "@solidjs/router";
import RoleBasedAccess from "../components/roleBasedAccess";

function setting() {
  //const [changeRole,setChangeRole] = createSignal('');
  const { setStatusCode } = authStore;
  const [userList, setUserList] = createSignal([]);
  const navigate = useNavigate();

  async function fetchUserList() {
    const response = await customFetch("api/usersRole", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // token 未允許授權
    if (response?.status == 403) {
      notAuthorized();
      navigate("/", { replace: true });
    }

    // token 已經逾時
    if (response.status == 441 || response.status == 404) {
      console.log("setting response", response);
      changeFailedNotify();
      setStatusCode(441);
      // navigate("/", { replace: true });
      return;
    }

    const jsonData = await response.json();
    console.log(" setting response", response);
    console.log("setting jsonData", jsonData);
    setUserList(jsonData);
  }

  createEffect(() => {
    fetchUserList();
  });

  async function rolehandle(user, role) {
    try {
      console.log("user", user);
      console.log("role", role);
      //setChangeRole(role);
      //console.log("changeRole",changeRole())
      const response = await customFetch("api/setUserRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          role,
        }),
      });
      const jsonData = await response.json();
      console.log("roleBasedAccess", jsonData);
      fetchUserList();
      if (response.status == 441) {
        setStatusCode(441);
        changeFailedNotify();
      }
      if (response.status == 500) {
        changeFailedNotify();
      }
      if (response.status == 201) {
        editSuccessNotify();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    //  setUserRole(jsonData.userRole);
  }

  const statusColorEnum = {
    engineer: "text-bg-secondary",
    employee: "text-bg-success",
    admin: "text-bg-danger",
  };

  return (
    <>
      <div
        class="col-md-11 position-relative"
        style="background-color: #EEEDF3;"
      >
        <h2 class="mt-4">管理權限</h2>
        <div class="scorllbar" style="height:800px;">
          <table class="table table-light align-middle sticky-top top-0 px-5">
            <thead class="position-sticky top-0">
              <tr class="fw-bold fs-3 ">
                <th class="text-primary " scope="col">
                  工號
                </th>
                <th class="text-primary " scope="col">
                  E-mail
                </th>
                <th class="text-primary " scope="col">
                  權限
                </th>
                <th class="text-primary " scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <For each={userList()}>
                {(user, i) => (
                  <tr>
                    <th class="fw-bold fs-3" scope="row">
                      {user.id}
                    </th>
                    <td class="fw-bold fs-4">{user.email}</td>
                    <td class="fw-bold fs-4 ">
                      {" "}
                      <span
                        class={`rounded-3 text-white p-2 ${
                          statusColorEnum[user.role]
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    {/* <td class="fw-bold fs-4 ">
                    <div class="form-check form-switch d-flex flex-column">
                    <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        admin
                      <input
                        class="form-check-input"
                        type="checkbox"   
                        role="switch"
                        name="role"
                        id="flexSwitchCheckDefault"
                      />
                     
                      </label>
                    </div>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="role"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        employee
                      </label>
                    </div>
                    <div class="form-check form-switch d-flex flex-column-reverse ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="role"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                       engineer
                      </label>
                    </div>
                  </td> */}
                    <td>
                      <RoleBasedAccess
                        userData={user}
                        roleBasehandle={rolehandle}
                      />
                    </td>
                  </tr>
                )}
              </For>
              <Show when={userList().length == 0}>
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
      </div>
    </>
  );
}

export default setting;
