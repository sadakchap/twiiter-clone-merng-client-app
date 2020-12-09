import moment from "moment";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Label, Icon, Image, Button, Popup } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const PostCard = (props) => {
  const {
    post: { id, body, username, createdAt, likesCount, commentsCount, likes },
  } = props;
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const commentOnPost = () => {
    history.push(`/posts/${id}`);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likesCount }} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button as="div" labelPosition="right" onClick={commentOnPost}>
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentsCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
