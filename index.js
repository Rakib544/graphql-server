const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

//
const { MONGO } = require("./config");
const Post = require("./models/Post");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({});
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("Database connected");
    return server.listen({ port: 8080 });
  })
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  });
