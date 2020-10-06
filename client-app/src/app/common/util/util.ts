import { IPost } from "../../models/post";
import { IAnonymousUser } from "../../models/anonymousUser";
import { toast } from "react-toastify";
const readingTime = require("reading-time");

export const setPostProps = (post: IPost, anonUser: IAnonymousUser) => {
  //Need to get the anonymous user first;
  post.hasLiked = post.reactions.some(
    (x) => x.author.id === anonUser?.id && x.isPositive
  );

  post.publishDate = new Date(post.publishDate);

  post.comments.forEach((comment) => {
    comment.publishedDate = new Date(comment.publishedDate);

    comment.replies.forEach((reply) => {
      reply.publishedDate = new Date(reply.publishedDate);
    });
  });

  post.reactions.forEach((reaction) => {
    reaction.reactionDate = new Date(reaction.reactionDate);
  });

  post.positiveReactionsCount = post.reactions.filter(
    (reaction) => reaction.isPositive
  ).length;

  post.timeToRead = readingTime(post.content).text;

  return post;
};

export const copyToClipboard = (externalUrl: string) => {
  navigator.clipboard.writeText(externalUrl);
  toast.success("Copied to clipboard.");
};

export const generateShareUrl = (
  shareUrl: string,
  title: string,
  url: string
): string => {
  return encodeURI(shareUrl.replace("[TITLE]", title).replace("[URL]", url));
};

export const internalUrl = (slug:string) => `/post/${slug}`;
//TODO: Fix this url
export const externalUrl = (slug:string) => `http://localhost:3001/post/${slug}`;
export const twitterShareUrl = "http://twitter.com/share?text=[TITLE]&url=[URL]";
export const linkedInShareUrl =
  "https://www.linkedin.com/sharing/share-offsite/?url=[URL]";