// userMutationResolvers.js
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const userMutationResolvers = {
    Mutation: {
        createUser: async (parent, args) => {
            // Hash the password before saving it
            const userExists = await User.findOne({ email: args.UserInput.email });
            if (userExists) {
                throw new Error("User already exists!");
            }
            const hashedPassword = await bcrypt.hash(args.UserInput.password, 10);
            const user = new User({
                name: args.UserInput.name,
                email: args.UserInput.email,
                password: hashedPassword,
            });
            await user.save();
            return user;
        },
        deleteUser: async (parent, args) => {
            const user = await User.findByIdAndDelete(args.id);
            return user;
        },
    }
};

module.exports = { userMutationResolvers };
