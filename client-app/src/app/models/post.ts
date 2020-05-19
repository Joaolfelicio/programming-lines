import { ICategory } from "./category";
import { IAuthor } from "./author";
import { IComment } from "./comment";
import { IReaction } from "./reaction";

export interface IPost {
    id: string;
    slug: string;
    image: string;
    title: string;
    subTitle: string;
    hasLiked: boolean;
    content: string;
    positiveReactionsCount: number;
    timeToRead: string;
    publishDate: Date;
    category: ICategory;
    author: IAuthor;
    comments: IComment[];
    reactions: IReaction[];
    recommendedPosts: IPostRecommend[];
}

export interface IPostRecommend {
    id: string;
    slug: string;
    image: string;
    title: string;
    content: string;
    publishDate: Date;
    category: ICategory;
}

export interface IPostsEnvelope {
    posts: IPost[];
    postsCount: number;
}