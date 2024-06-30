import { TParam } from "../type/productType";
import axios_auth from "./httpClient";


const getAllProduct = (params: TParam) => {
  return axios_auth.get(`/products/search?q=${params.search}&limit=${params.limit}&skip=${params.skip}`);
};

export { getAllProduct };
