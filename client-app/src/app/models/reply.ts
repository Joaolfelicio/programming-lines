import { IAnonymousUser } from "./anonymousUser";

export interface IReply {
    id: string;
    authorEmail: string;
    authorDisplayName: string;
    content: string;
    publishedDate: Date;
    author: IAnonymousUser;
}