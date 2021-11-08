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
export async function addBrand(data, img) {
  try {
    const URL = `${url}/admin/brand/create`;
    var dataform = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("adminToken"));
    dataform.append("name", data.name);
    dataform.append("img_url", img);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: dataform,
      redirect: "follow",
    };
    const response = await fetch(URL, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function editBrand(id, data, img) {
  try {
    const URL = `${url}/admin/brand/edit/${id}`;
    var dataform = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("adminToken"));
    dataform.append("name", data.name);
    if (data.editimg) {
      dataform.append("img_url", img);
    }
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: dataform,
      redirect: "follow",
    };
    const response = await fetch(URL, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
