import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

const resolvers = {
  Query: {
    users() {
      return db.Users;
    },
    products() {
      return db.Products;
    },
    physicalproducts() {
      return db.Products.filter((p) => p.__typename === "PhysicalProduct");
    },
    digitalproducts() {
      return db.Products.filter((p) => p.__typename === "DigitalProduct");
    },
  },
  PhysicalProduct: {
    seller(parent) {
      return db.Users.find((u) => u.id === parent.sellerId);
    },
  },
  DigitalProduct: {
    seller(parent) {
      return db.Users.find((u) => u.id === parent.sellerId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
