import { refreshAccessToken } from "@/store/actions/authActions";
import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { store } from "../store";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.tabihunt.kz/api/";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
  } as AxiosHeaders;

  const pathname = window.location.pathname;
  const lang = pathname.split("/")[1] || "ru";

  config.headers["Accept-Language"] = lang;

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;
    const refreshToken = localStorage.getItem("refreshToken");

    switch (error.response?.status) {
      case 400:
        showError(
          error.response?.status,
          error.response?.data.message ?? "Некорректные данные"
        );
        break;
      case 401:
        showError(
          error.response?.status,
          error.response?.data.message ?? "Ошибка аутентификации и авторизации"
        );
        break;
      case 403:
        if (refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await store.dispatch(
              refreshAccessToken(refreshToken)
            );
            if (response && response.accessToken) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.accessToken}`;
              return axios(originalRequest);
            }
          } catch (err) {
            console.error("Failed to refresh token", err);
          }
        }
        showError(
          error.response?.status,
          error.response?.data?.message ?? "Доступ запрещен"
        );
        return Promise.reject(error);
      case 404:
        showError(
          error.response?.status,
          error.response?.data.message ?? "Ошибка аутентификации и авторизации"
        );
        break;
      case 500:
        showError(
          error.response?.status,
          error.response?.data.message ?? "Доступ временно недоступен"
        );
        break;
      case 504:
        showError(error.response?.status, "Данные недоступны");
        break;
    }
    return Promise.reject(error);
  }
);
const showError = (status: number, message: string) => {
  // store.dispatch(
  //   setErrorMessage({
  //     status,
  //     message
  //   })
  // )
};
export default http;
