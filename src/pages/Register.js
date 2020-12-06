import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";

const Register = (props) => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_QUERY, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const { username, email, password, confirmPassword } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit handler");
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      console.log("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords must match!");
      return;
    }
    addUser();
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={username}
          error={error.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={email}
          error={error.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          error={error.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          {" "}
          Register
        </Button>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(error).map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Register;

const REGISTER_USER_QUERY = gql`
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
