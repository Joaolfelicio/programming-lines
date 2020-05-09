import { IAnonymousUser } from "./anonymousUser";

export interface IReaction {
    id: string;
    author: IAnonymousUser;
    isPositive: boolean;
    reactionDate: Date;
}