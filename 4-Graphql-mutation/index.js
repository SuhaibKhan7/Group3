import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
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

  Mutation: {
    createUser(_, { newuser }) {
      const id = uuidv4();
      const user = { id, ...newuser };
      db.Users.push(user);
      const updateddb = `export default ${JSON.stringify(db)}`;
      fs.writeFileSync("./db.js", updateddb);
      console.log(user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);
