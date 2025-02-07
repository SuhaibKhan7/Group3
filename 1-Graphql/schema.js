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

//query structure 
type Query{
users:[User]
reviews:[Review]
}


`