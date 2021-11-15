import { url } from "../../utils/ApiConfig";
export async function authUserAdmin(data) {
  try {
    const URL = `${url}/admin/auth/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
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
