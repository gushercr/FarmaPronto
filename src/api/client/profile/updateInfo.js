import { url } from "../../../utils/ApiConfig";
export async function updateInfoGeneral(data) {
  try {
    const URL = `${url}/user/edit/profile`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        name: data.name,
        last_name: data.lastname,
        phone: "+52 " + data.tel,
        birthday: data.birthday,
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

export async function updateQuestion(data) {
  try {
    const URL = `${url}/user/edit/profile`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        question: data.question,
        answer: data.answer,
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
export async function changePassword(data) {
  try {
    const URL = `${url}/user/edit/password`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        password: data.password,
        new_password: data.newpassword,
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
