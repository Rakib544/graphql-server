const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

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

server.listen({ port: 8080 }).then((res) => {
  console.log(`Server is running on ${res.url}`);
});
