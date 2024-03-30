async function handleResponse(response) {
  switch (response.status) {
    case 200:
      return await response.json();
    case 201:
      editSuccessNotify();
      return await response.json();
    case 500:
      changeFailedNotify();
      return null; 
    default:
      // 其他狀態碼的處理...
      return null;
  }
}


export default handleResponse;