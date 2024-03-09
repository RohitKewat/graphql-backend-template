const express = require("express");
const cors = require("cors");
const app = express();
const User = require("../models/user");
const {userQueryResolvers} = require('./AllQueries/userQueries');
const {userMutationResolvers} = require('./AllMutations/userMutation');
const {loginMutationResolvers} = require('./AllMutations/loginMutation');

app.use(cors());

const resolvers = {
    // Queries
     ...userQueryResolvers ,
    // Mutations
    ...userMutationResolvers,
    ...loginMutationResolvers
}

module.exports = { resolvers };