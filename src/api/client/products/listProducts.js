import { url } from "../../../utils/ApiConfig";
export async function getProductsMain() {
  try {
    const URL = `${url}/product/list/published?sort=az&skip=0&limit=10`;
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
// export async function getAddressesApi(auth) {
//     try {
//         const url=`${API_URL}/addresses?user=${auth.idUser}`;
//         const params={
//             headers:{
//                 "Content-Type":"application/json",
//                 Authorization:`Bearer ${auth.token}`
//             },
//         }
//         const response=await fetch(url,params);
//         const result=await response.json();
//         return result;
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }
