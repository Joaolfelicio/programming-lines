import axios, { AxiosResponse } from "axios";
import { IPost, IPostsEnvelope, IPostsForm } from "../models/post";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";
import { INewsletterEnvelope } from "../models/Requests/newsletterEnvelope";
import { toast } from "react-toastify";
import { IAnonUserIdEnvelope } from "../models/Requests/anonUserIdEnvelope";
import { ISearchablePostDto } from "../models/Dto/searchPostDto";
import { history } from "../../index";
import { ICategory, ICategoryForm } from "../models/category";
import { IUserFormValues, IAdminUser } from "../models/adminUser";

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
  const { status, headers, config, data } = error.response;

  if (status === 404) {
    history.push("/NotFound");
  }

  if (
    status === 401 &&
    headers["www-authenticate"] &&
    headers["www-authenticate"].includes(
      'Bearer error="invalid_token", error_description="The token expired'
    )
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/NotFound");
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
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Post = {
  list: (params: URLSearchParams): Promise<IPostsEnvelope> =>
    axios.get("/Post", { params: params }).then(responseBody),
  react: (reaction: IReactionEnvelope) => requests.post(`/Reaction`, reaction),
  detail: (slug: string): Promise<IPost> => requests.get(`/Post/${slug}`),
  searchableList: (): Promise<ISearchablePostDto[]> =>
    requests.get("/Post/SearchablePosts"),
  create: (post: IPostsForm) => requests.post("/Post", post),
  delete: (id: string) => requests.delete(`/Post/${id}`),
  edit: (post: IPostsForm, postId: string) =>
    requests.put(`/Post/${postId}`, post),
};

const AnonUser = {
  get: (anonUserIdEnvelope: IAnonUserIdEnvelope): Promise<IAnonymousUser> => {
    return requests.post(`/AnonymousUser`, anonUserIdEnvelope);
  },
  create: (
    anonUserFingerprint: IFingeprintEnvelope
  ): Promise<IAnonymousUser> => {
    return requests.post(`/AnonymousUser/Create`, anonUserFingerprint);
  },
};

const AdminUser = {
  login: (user: IUserFormValues): Promise<IAdminUser> =>
    requests.post("/user/login", user),
  current: (): Promise<IAdminUser> => requests.get("/user/currentUser"),
};

const Newsletter = {
  subscribe: (newsletter: INewsletterEnvelope) =>
    requests.post(`/Newsletter`, newsletter),
  list: () => requests.get("/Newsletter"),
  delete: (id: string) => requests.delete(`/Newsletter/${id}`),
};

const Category = {
  list: (): Promise<ICategory[]> => requests.get(`/Category`),
  create: (category: ICategoryForm) => requests.post("/Category", category),
  delete: (id: string) => requests.delete(`/Category/${id}`),
  detail: (categoryCode: string) => requests.get(`/Category/${categoryCode}`),
  edit: (category: ICategoryForm, categoryCode: string) =>
    requests.put(`/Category/${categoryCode}`, category),
};

const Admin = {
  uploadPostImage: (photo: Blob): Promise<string> =>
    requests.postForm(`/admin/UploadPostImage`, photo),
  uploadCategoryImage: (photo: Blob): Promise<string> =>
    requests.postForm(`/admin/UploadCategoryImage`, photo),
};

export default {
  Post,
  AnonUser,
  Newsletter,
  Category,
  AdminUser,
  Admin,
};
