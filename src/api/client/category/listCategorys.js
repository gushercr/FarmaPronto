import { url } from "../../../utils/ApiConfig";
export async function getListCategorys() {
  try {
    const URL = `${url}/category/list`;
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
