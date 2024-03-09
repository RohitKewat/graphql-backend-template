const mongoose = require('mongoose')
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');
const os = require('os')
dotenv = require('dotenv').config();

// Connect to MongoDB
const connection = process.env.MONGODB_URI ;
mongoose.set('strictQuery', false);
mongoose.connect(connection, {   
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully")).catch((err) => console.log(err));

(async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const pubsub = new PubSub();

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, pubsub }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }],
    });

    await server.start();
    server.applyMiddleware({
        app,
    });
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);

})(typeDefs, resolvers);


const totalMemory = os.totalmem();

// Convert bytes to gigabytes for a more human-readable format
const totalMemoryGB = (totalMemory / (1024 ** 3)).toFixed(2);

console.log(`Total Memory Size: ${totalMemoryGB} GB`);