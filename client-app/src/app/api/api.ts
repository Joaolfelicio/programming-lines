import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/post";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
}

const Post = {
    list: (): Promise<IPost[]> => requests.get(`/Post`),
    react: (reaction: IReactionEnvelope) => requests.post(`/Reaction`, reaction)
}

const AnonUser = {
    get: (fingerprint: IFingeprintEnvelope): Promise<IAnonymousUser> => {
      return requests.post(`/AnonymousUser`, fingerprint)
    }
}

export default {
    Post,
    AnonUser
}
