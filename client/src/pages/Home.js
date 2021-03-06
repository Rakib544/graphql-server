import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Grid, Loader, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

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
        <Transition.Group>
          {data?.getPosts &&
            data?.getPosts?.map((post) => (
              <Grid.Column key={post.id} style={{ margin: "15px 0" }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
