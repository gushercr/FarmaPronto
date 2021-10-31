import { url } from "../../../utils/ApiConfig";
export async function addAddress(data) {
  try {
    const URL = `${url}/address/create`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        title: data.title,
        colony: data.colony,
        street: data.street,
        reference: data.reference,
        int_num: data.int_num,
        out_num: data.out_num,
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
