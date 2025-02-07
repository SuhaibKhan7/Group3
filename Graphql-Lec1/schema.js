export const typeDefs=` #graphql
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

type Query{
users:[User]
reviews:[Review]
}


`