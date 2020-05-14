import { IPost } from "../../models/post";
import { IAnonymousUser } from "../../models/anonymousUser";
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

