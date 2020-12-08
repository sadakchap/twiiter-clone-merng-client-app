import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
  const [values, setValues] = useState({
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update: (proxy, result) => {
      console.log(result);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(data);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });

      setValues({
        ...values,
        body: "",
      });
    },
    onError: (err) => {
      console.log(err);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit">Submit</Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "1rem" }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      username
      body
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount

      likesCount
    }
  }
`;
