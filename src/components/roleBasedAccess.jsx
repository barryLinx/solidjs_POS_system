//import { createSignal } from "solid-js";


function roleBasedAccess({ userData,roleBasehandle }) {

  return (
    <>
      <div class="d-flex flex-column w-50">
        <button
          className="btn btn-outline-danger mt-2"
          onClick={() => roleBasehandle(userData.username,'admin')}
          classList={{ active: userData.role === 'admin' }}
        >
          admin
        </button>
        <button
          className="btn btn-outline-success mt-2"
          onClick={() => roleBasehandle(userData.username,'employee')}
          classList={{ active: userData.role === 'employee'  }}
        >
          employee
        </button>
        <button
          className="btn btn-outline-secondary mt-2"
          onClick={() => roleBasehandle(userData.username,'engineer')}
          classList={{ active: userData.role === 'engineer'  }}
        >
          engineer
        </button>
      </div>
    </>
  );
}

export default roleBasedAccess;
