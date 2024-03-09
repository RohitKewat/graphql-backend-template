const { gql } = require('apollo-server');
const {userTypeDefs} = require('./AllTypeDefs/userTypeDefs');
const {loginTypeDefs} = require('./AllTypeDefs/loginTypedefs');

const typeDefs = gql`

${userTypeDefs},
${loginTypeDefs}

# Queries
type Query {
    users: [user]
    user(id: ID!): user
}
# Mutations
type Mutation {
    createUser(UserInput :userInput): user
    deleteUser(id: ID!): user
    login(loginInput: loginInput): login

}

`;

module.exports = {typeDefs};