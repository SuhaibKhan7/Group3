export const typeDefs = `#graphql

type User{
    id: ID!
    name: String!
    email: String!
}
type Product{
    id: ID!
    name: String!
    price: Float!
    category:String!
    sellerid:ID!
    seller:User


}
type Query{
    users:[User!]!
    products:[Product]
}

`;
