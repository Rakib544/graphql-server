const User = require("../../models/User");

module.exports = {
  Mutation: {
    register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO Validate the data
      // TODO Make sure user does not already exists
      // TODO Has password and create auth token
    },
  },
};
