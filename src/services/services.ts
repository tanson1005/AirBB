import { axiosInterceptor, axiosInterceptorWithCybertoken } from './axiosInterceptor';
import { getLocal } from '../utils/utils';
import { ACCESS_TOKEN, CYBER_TOKEN } from '../constant/constant';

// Chuyển đổi AxiosHeaders thành đối tượng JavaScript thông thường
const createConfigHeaders = () => {
  const headers: any = {};
  const accessToken = getLocal(ACCESS_TOKEN);
  if (accessToken) {
    headers.token = accessToken;
  }
  headers.tokenCybersoft = CYBER_TOKEN;
  return headers;
};

// Sử dụng đối tượng headers đã chuyển đổi
axiosInterceptor.interceptors.request.use((config) => {
  config.headers = createConfigHeaders();
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInterceptorWithCybertoken.interceptors.request.use((config) => {
  config.headers.tokenCybersoft = CYBER_TOKEN;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { axiosInterceptor, axiosInterceptorWithCybertoken };
