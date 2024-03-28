import { createEffect, createSignal, For } from "solid-js";
import customFetch from "../helper/customFetch";
//import authStore from "../store/authStore";
import { notAuthorized,editSuccessNotify } from "../helper/notifyToast";
import { useNavigate } from "@solidjs/router";
import RoleBasedAccess from "../components/roleBasedAccess";

function setting() {
  //const [changeRole,setChangeRole] = createSignal('');
  //const { userRole } = authStore;
  const [userList, setUserList] = createSignal([]);
  const navigate = useNavigate();

  async function fetchUserList(){
    const response = await customFetch("api/usersRole", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();
    console.log(" setting response", response);
    console.log("setting jsonData", jsonData);
    setUserList(jsonData);
    if (response?.status == 403) {
      notAuthorized();
      navigate("/home", { replace: true });
    }
  }

  createEffect(()=>{fetchUserList()});

  async function rolehandle(username,role) {

    //try {
      console.log("userData_username",username)
      //setChangeRole(role);
      //console.log("changeRole",changeRole())
      const response = await customFetch("api/setUserRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          role: role,
        }),
      });
      const jsonData = await response.json();  
      console.log("roleBasedAccess", jsonData);
      fetchUserList();
      editSuccessNotify();
   // } catch (error) {
      //console.error("Error fetching data:", error);      
   // }
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
                  <th class="text-primary " scope="col">工號</th>
                  <th class="text-primary " scope="col">E-mail</th>
                  <th class="text-primary " scope="col">權限</th>
                  <th class="text-primary " scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <For each={userList()}>
                  {(user, i) => (
                    <tr>
                      <th class="fw-bold fs-3" scope="row">
                        {user.username}
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
                        <RoleBasedAccess userData={user} roleBasehandle={rolehandle} />
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>

    </>
  );
}

export default setting;
