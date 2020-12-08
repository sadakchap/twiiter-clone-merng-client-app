import { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update: (proxy, result) => {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      });
      // update cache
      if (callback) callback();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

export default DeleteButton;

const DELETE_POST_MUTATION = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
