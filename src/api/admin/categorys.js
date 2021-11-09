import { url } from "../../utils/ApiConfig";
export async function getCategorys() {
  try {
    const URL = `${url}/admin/category/list`;
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
export async function editCategory(id, data) {
  try {
    const URL = `${url}/admin/category/edit/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("adminToken"),
      },
      body: JSON.stringify({
        name: data.name,
      }),
    };
    const response = await fetch(URL, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function addCategory(data) {
  try {
    const URL = `${url}/admin/category/create`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("adminToken"),
      },
      body: JSON.stringify({
        name: data.name,
      }),
    };
    const response = await fetch(URL, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
