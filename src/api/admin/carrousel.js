import { url } from "../../utils/ApiConfig";
export async function getElementsCarrousel() {
  try {
    const URL = `${url}/admin/carousel/list`;
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
export async function addImage(img, position) {
  try {
    const URL = `${url}/admin/carousel/create`;
    var dataform = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("adminToken"));
    dataform.append("position", position);
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
export async function deleteImage(id) {
  try {
    const URL = `${url}/admin/carousel/delete/${id}`;
    const params = {
      method: "DELETE",
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
