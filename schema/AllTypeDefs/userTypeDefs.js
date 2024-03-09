// userTypeDefs.js
const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type user {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  input userInput {
    name: String!
    email: String!
    password: String!
  }
`;

module.exports = { userTypeDefs };
