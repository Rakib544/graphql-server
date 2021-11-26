module.exports.validateRegisteredInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username can't be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email can't be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must matched";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
