const { UserInputError } = require("apollo-server-errors");
const Post = require("../../models/Post");
const checkauth = require("../../utils/checkauth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkauth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkauth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);

          await post.save();
          return post;
        }
      }
    },
  },
};
