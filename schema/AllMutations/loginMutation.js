
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginMutationResolvers = {
    Mutation: {
        login: async (parent, args) => {
        const user = await User.findOne({ email: args.loginInput.email });
        if (!user) {
            throw new Error("User does not exist!");
        }
        const valid = await bcrypt.compare(args.loginInput.password, user.password);
        if (!valid) {
            throw new Error("Invalid password!");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, "somesuper",);
        return { access_token: token };
        },
    },
}

module.exports = { loginMutationResolvers };
