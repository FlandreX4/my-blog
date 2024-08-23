import axios from "axios";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const requests = axios.create({
  baseURL: "/api",
  timeout: 10000,
  // 请求头
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "API-Authorization": import.meta.env.VITE_API_AUTHORIZATION,
  },
});

// 请求拦截器
requests.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器
requests.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substring(message.length - 3) + "异常";
    }
    console.log("message:", message);
    return Promise.reject(error);
  }
);

// 对外暴露
export default requests;
