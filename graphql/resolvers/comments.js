const { UserInputError } = require("apollo-server-errors");
const Post = require("../../models/Post");
const checkauth = require("../../utils/checkauth");

module.exports = {
  Mutation: {
    async createComment(_, { postId }, context) {
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
  },
};
