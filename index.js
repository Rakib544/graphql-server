const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

//
const { MONGO } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
