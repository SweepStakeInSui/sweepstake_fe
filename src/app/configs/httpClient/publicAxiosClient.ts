import type { AxiosInstance } from 'axios';
import axios from 'axios';

const publicAxiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default publicAxiosClient;
