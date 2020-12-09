import { useContext, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  Popup,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/authContext";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const { loading, data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const commentInputRef = useRef("");

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: (_, result) => {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
  });

  const deleteButtonCallback = () => {
    props.history.push("/");
  };

  return (
    <div>
      {loading && "Loading..."}
      {getPost && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{getPost.username}</Card.Header>
                  <Card.Meta>{moment(getPost.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{getPost.body}</Card.Description>
                  <hr />
                  <Card.Content extra>
                    <LikeButton
                      user={user}
                      post={{
                        id: getPost.id,
                        likes: getPost.likes,
                        likesCount: getPost.likesCount,
                      }}
                    />
                    <Popup
                      content={"Comment"}
                      inverted
                      trigger={
                        <Button
                          as="div"
                          labelPosition="right"
                          onClick={() => commentInputRef.current.focus()}
                        >
                          <Button basic color="blue">
                            <Icon name="comments" />
                          </Button>
                          <Label basic color="blue" pointing="left">
                            {getPost.commentsCount}
                          </Label>
                        </Button>
                      }
                    />
                    {user && user.username === getPost.username && (
                      <DeleteButton
                        postId={getPost.id}
                        callback={deleteButtonCallback}
                      />
                    )}
                  </Card.Content>
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          name="comment"
                          placeholder="comment here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button red"
                          disabled={comment.trim() === ""}
                          onClick={submitComment}
                        >
                          Comment
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {getPost.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton
                        postId={getPost.id}
                        commentId={comment.id}
                      />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default SinglePost;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: ID!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentsCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        body
      }
    }
  }
`;
