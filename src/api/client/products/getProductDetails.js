import { url } from "../../../utils/ApiConfig";
export async function getProductDetail(id) {
  try {
    const URL = `${url}/product/getproduct/${id}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
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
