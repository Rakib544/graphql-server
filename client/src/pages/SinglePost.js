import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });
  console.log(id);
  console.log(data);
  console.log(error);

  const navigate = useNavigate();

  const deletePostCallback = () => {
    navigate("/");
  };

  // const {
  //   username,
  //   createdAt,
  //   body,
  //   likes,
  //   // comments,
  //   likeCount,
  //   commentCount,
  // } = data?.getPost;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Grid.Row>
      <Grid.Column width={2}>
        <Image
          float="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{data.getPost.username}</Card.Header>
            <Card.Meta>{moment(data.getPost.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{data.getPost.body}</Card.Description>
          </Card.Content>
          <hr />
          <Card.Content extra>
            <LikeButton
              user={user}
              post={{
                id,
                likes: data.getPost.likes,
                likeCount: data.getPost.likeCount,
              }}
            />
            <Button
              as="div"
              labelPosition="right"
              onClick={() => console.log("rakib")}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {data.getPost.commentCount}
              </Label>
            </Button>
            {user && user.username === data.getPost.username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
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
