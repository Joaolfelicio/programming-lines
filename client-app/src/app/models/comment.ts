import { IAnonymousUser } from "./anonymousUser";
import { IReply } from "./reply";

export interface IComment {
    id: string;
    authorEmail: string;
    authorDisplayName: string;
    content: string;
    publishedDate: Date;
    author: IAnonymousUser;
    replies: IReply[];
}