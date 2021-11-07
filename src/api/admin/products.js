import { url } from "../../utils/ApiConfig";
export async function getProducts(type) {
  switch (type) {
    case "published":
      try {
        const URL = `${url}/admin/product/list/published?sort=az`;
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

    case "unpublished":
      try {
        const URL = `${url}/admin/product/list/unpublished?sort=az`;
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

    default:
      break;
  }
}
export async function getProduct(id) {
  try {
    const URL = `${url}/admin/product/getproduct/${id}`;
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
export async function insertProduct(data, main_img, detailsimg) {
  try {
    const URL = `${url}/admin/product/create`;
    var dataform = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("adminToken"));
    dataform.append("title", data.title);
    dataform.append("category", data.category);
    dataform.append("price", data.price);
    dataform.append("discount", data.discount);
    dataform.append("stock", data.stock);
    dataform.append("brand", data.brand);
    dataform.append("description", data.description);
    dataform.append("main_img", main_img);
    dataform.append("detail_img", detailsimg);
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
export async function editProduct(id, data, main_img, detailsimg) {
  try {
    const URL = `${url}/admin/product/edit/${id}`;
    var dataform = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("adminToken"));
    dataform.append("title", data.title);
    dataform.append("category", data.category);
    dataform.append("price", data.price);
    dataform.append("discount", data.discount);
    dataform.append("stock", data.stock);
    dataform.append("brand", data.brand);
    dataform.append("description", data.description);
    if (data.img_detail_edit) {
      if (data.imgId !== " ") {
        dataform.append("delete_img", data.imgId);
      }
      dataform.append("detail_img", detailsimg);
    }
    if (data.img_main_edit) {
      dataform.append("main_img", main_img);
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

export async function changePublished(id) {
  try {
    const URL = `${url}/admin/product/modifystatus/${id}`;
    const params = {
      method: "PUT",
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
