import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });

  const {
    body,
    createdAt,
    username,
    likes,
    comments,
    likeCount,
    commentCount,
  } = data?.getPost;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Grid.Row>
      <Grid.Column width={2}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <hr />
          <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Button
              as="div"
              labelPosition="right"
              onClick={() => console.log("rakib")}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
        createdAt
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
