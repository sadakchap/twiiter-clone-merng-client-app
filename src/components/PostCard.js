import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Label, Icon, Image, Button } from "semantic-ui-react";

const PostCard = (props) => {
  const {
    post: { id, body, username, createdAt, likesCount, commentsCount },
  } = props;

  const likePost = () => {};

  const commentOnPost = () => {};

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
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button basic color="red">
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
