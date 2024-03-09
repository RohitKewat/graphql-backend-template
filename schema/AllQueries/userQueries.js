// userQueryResolvers.js
const User = require("../../models/user");

const userQueryResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  }
};

module.exports = { userQueryResolvers };
