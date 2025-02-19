export const typeDefs = `#graphql
type User{
id:ID!
name:String!
username:String!
email:String!
}
type Review{
id:ID!
rating:Int!
context:String!
}
type Post{
    id:ID!
    title:String!
}
type Query{
users:[User]
reviews:[Review]
posts:[Post]
post(id:ID):Post
user(id:ID):User
}


`;
