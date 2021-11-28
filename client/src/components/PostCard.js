import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

const PostCard = ({
  post: { username, createdAt, body, likeCount, commentCount, likes, id },
}) => {
  const { user } = useContext(AuthContext);
  const handleLikePost = () => {};
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          <strong>{body}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Button as="div" labelPosition="right" onClick={handleLikePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button labelPosition="right" as={Link} to={`posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" onClick={() => {}} floated="right">
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
