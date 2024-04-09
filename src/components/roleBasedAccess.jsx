//import { createSignal } from "solid-js";


function roleBasedAccess({ userData,roleBasehandle }) {

  return (
    <>
      <div class="d-flex flex-column w-50"
      //  style={{
      //   'pointer-events': userData.id === '100' ? 'none' : '',
      //   'opacity':  userData.id === '100' ? 0.5 : '',
      // }}
      >
        <button
          className="btn btn-outline-danger mt-2"
          onClick={() => roleBasehandle(userData,'admin')}
          classList={{ active: userData.role === 'admin'}}
        >
          admin
        </button>
        <button
          className="btn btn-outline-success mt-2"
          onClick={() => roleBasehandle(userData,'employee')}
          classList={{ active: userData.role === 'employee'  }}
        >
          employee
        </button>
        <button
          className="btn btn-outline-secondary mt-2"
          onClick={() => roleBasehandle(userData,'engineer')}
          classList={{ active: userData.role === 'engineer'  }}
        >
          engineer
        </button>
      </div>
    </>
  );
}

export default roleBasedAccess;
