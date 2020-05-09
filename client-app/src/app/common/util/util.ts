import { IPost } from "../../models/post";
const readingTime = require('reading-time');

export const setPostProps = (post: IPost) => {
  //Need to get the anonymous user first;
  // post.hasLiked;

  // post.timeToRead;
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

// <iframe
//   src="https://carbon.now.sh/embed/"
//   style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
//   sandbox="allow-scripts allow-same-origin">
// </iframe>