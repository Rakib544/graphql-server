import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { handleChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      // console.log(result);
      context.login(result.data.register);
      // console.log(result);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      // err.graphQLErrors[0].extensions.exception.errors
      setErrors({});
    },
    variables: values,
  });

  console.log(error);

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          placeholder="email.."
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
