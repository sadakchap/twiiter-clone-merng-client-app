import { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";

const Login = (props) => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const [loginUser, { loading }] = useMutation(LOGIN_USER_QUERY, {
    update(proxy, result) {
      login(result.data.login);
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
      [e.target.name]: e.target.value.trim(),
    });
  };

  const { username, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit handler");
    if (username === "" || password === "") {
      console.log("All fields are required!");
      return;
    }
    loginUser();
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={username}
          error={error.username ? true : false}
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
        <Button type="submit" primary>
          {" "}
          Login
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

export default Login;

const LOGIN_USER_QUERY = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
