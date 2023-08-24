import axios from "axios";

const {
  EXPO_PUBLIC_MODEL_BASE_URL: baseURL ,
  EXPO_PUBLIC_PERSONAL_ACCESS_TOKEN: Authorization ,
} = process.env;


export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Key ${Authorization}`,
    Accept: 'application/json',
  },
  timeout: 10000
})
