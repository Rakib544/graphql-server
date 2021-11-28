import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

const SinglePost = () => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const commentInputRef = useRef(null);

  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });
  console.log(error);

  const navigate = useNavigate();

  const deletePostCallback = () => {
    navigate("/");
  };

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId: id,
      body: comment,
    },
  });

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

        {user && (
          <Card fluid>
            <Card.Content>
              <p>Post a comment</p>
              <Form>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Write a comment.."
                    name="comment"
                    value={comment}
                    ref={commentInputRef}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ui button teal"
                    disabled={!comment.trim().length > 0}
                    onClick={createComment}
                  >
                    Post
                  </button>
                </div>
              </Form>
            </Card.Content>
          </Card>
        )}

        {data?.getPost?.comments?.map((comment) => (
          <Card fluid key={comment.id}>
            <Card.Content>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
              <Card.Header>{comment.username}</Card.Header>
              <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{comment.body}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Grid.Column>
    </Grid.Row>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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
