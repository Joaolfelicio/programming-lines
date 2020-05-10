import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/post";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";
import { INewsletterEnvelope } from "../models/Requests/newsletterEnvelope";
import { toast } from "react-toastify";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error - Make sure the API is running!");
  }
  const { status, data, config, headers } = error.response;

  if (
    status === 401 &&
    headers["www-authenticate"] &&
    headers["www-authenticate"].includes(
      'Bearer error="invalid_token", error_description="The token expired'
    )
  ) {
    window.localStorage.removeItem("jwt");
    toast.info("Your session has expired, please login again");
  }

  if (status === 500) {
    toast.error("Server Error - Check the terminal for more info!");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Post = {
  list: (): Promise<IPost[]> => requests.get(`/Post`),
  react: (reaction: IReactionEnvelope) => requests.post(`/Reaction`, reaction),
};

const AnonUser = {
  get: (fingerprint: IFingeprintEnvelope): Promise<IAnonymousUser> => {
    return requests.post(`/AnonymousUser`, fingerprint);
  },
};

const Newsletter = {
  subscribe: (newsletter: INewsletterEnvelope) =>
    requests.post(`/Newsletter`, newsletter),
};

export default {
  Post,
  AnonUser,
  Newsletter
};
