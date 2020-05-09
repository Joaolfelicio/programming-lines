import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/post";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody)
}

const Post = {
    list: (): Promise<IPost[]> => {
        return requests.get(`/post`);
    }
}

export default {
    Post
}
