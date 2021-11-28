import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Grid, Loader } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <Loader active inline="centered" style={{ marginTop: "10px" }} />;
  }

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h2 className="page-title">Recent Posts</h2>
      </Grid.Row>
      <Grid.Row>
        {/* create post */}
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {/*  */}
        {data?.getPosts &&
          data?.getPosts?.map((post) => (
            <Grid.Column key={post.id} style={{ margin: "15px 0" }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default Home;
