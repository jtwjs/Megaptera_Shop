import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { auth } from "@/utils/auth";

const createInstance = () => {
  return setInterceptors(
    axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 3000,
    })
  );
};

const setInterceptors = (_instance: AxiosInstance) => {
  _instance.interceptors.request.use(onRequest, onRequestError);
  _instance.interceptors.response.use(onResponse, onResponseError);
  return _instance;
};
const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const userInfo = auth.getAuth();

  if (userInfo?.accessToken) {
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (
  error: AxiosError<unknown>
): Promise<unknown> => {
  if (error.response?.status === 403) {
    auth.logout();
  }
  return Promise.reject(error);
};

const instance = createInstance();

export default instance;
