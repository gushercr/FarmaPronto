import { url } from "../../../utils/ApiConfig";
export async function getGeneralInformationUser() {
  try {
    const URL = `${url}/user/profile`;
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
