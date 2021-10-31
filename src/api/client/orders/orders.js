import { url } from "../../../utils/ApiConfig";
export async function getListOrders() {
  try {
    const URL = `${url}/order/list`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken"),
      },
    };
    const response = await fetch(URL, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
