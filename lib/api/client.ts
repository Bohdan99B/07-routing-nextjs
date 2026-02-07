import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const apiClient = axios.create({
  baseURL: API_URL,
  proxy: false,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
