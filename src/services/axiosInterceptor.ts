import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/constant';

export const axiosInterceptor: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 180000
});

export const axiosInterceptorWithCybertoken: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 180000,
});
