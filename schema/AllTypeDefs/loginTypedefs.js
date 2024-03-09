const { gql } = require('apollo-server');


const loginTypeDefs = gql`
    type login {
        access_token: String!
    }
    input loginInput {
        email: String!
        password: String!
    }
    `;

module.exports = { loginTypeDefs };
