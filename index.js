const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGO } = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello world",
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
