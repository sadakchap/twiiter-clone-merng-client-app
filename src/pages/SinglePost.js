import { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/authContext";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { loading, data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
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
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("comment on Post")}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {getPost.commentsCount}
                      </Label>
                    </Button>
                    {user && user.username === getPost.username && (
                      <DeleteButton
                        postId={getPost.id}
                        callback={deleteButtonCallback}
                      />
                    )}
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default SinglePost;

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
      }
    }
  }
`;
