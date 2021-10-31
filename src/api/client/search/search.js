import { url } from "../../../utils/ApiConfig";
export async function searchWithQuery(query, skip, sort) {
  try {
    const URL = `${url}/product/list/published?filter=nombre&value=${query}&sort=${sort}&skip=${skip}&limit=10`;
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
export async function searchWithBrand(brand, skip, sort) {
  try {
    const URL = `${url}/product/list/published?filter=marca&value=${brand}&sort=${sort}&skip=${skip}&limit=10`;
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
export async function searchWithCategory(category, skip, sort) {
  try {
    const URL = `${url}/product/list/published?filter=categoria&value=${category}&sort=${sort}&skip=${skip}&limit=10`;
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
