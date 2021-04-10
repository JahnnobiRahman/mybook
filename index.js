const { gql } = require("apollo-server-core");
const { Query } = require("mongoose");

const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server');



const Post = require('./models/Post.js');
const { MONGODB } = require('./config.js')

const typeDefs = gql`

    type Post {
        id : ID!
        body: String!
        createdAt: String!
        username : String!
    }

 
type Query{
    getPosts : [Post]

    }
`;
                    
const resolvers = {

    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error)
            {
                throw new Error(err);
            }
        }
    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers

});


mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo');
        return server.listen({ port: 8000 });
    })
        
            .then((res) => {
            console.log(`Server running at ${res.url}`);
        });


