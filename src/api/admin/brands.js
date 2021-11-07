import { url } from "../../utils/ApiConfig";
export async function getBrands() {
  try {
    const URL = `${url}/admin/brand/list`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("adminToken"),
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
