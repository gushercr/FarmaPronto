import { url } from "../../../utils/ApiConfig";
export async function authRegister(data) {
  try {
    const URL = `${url}/auth/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        phone: "+52 " + data.tel,
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
