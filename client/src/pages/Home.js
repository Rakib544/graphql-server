import { gql, useQuery } from "@apollo/client";
import { Grid, Loader } from "semantic-ui-react";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  // console.log(data);

  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h2>Recent Posts</h2>
      </Grid.Row>
      <Grid.Row>
        {data?.getPosts &&
          data?.getPosts?.map((post) => (
            <Grid.Column key={post.id}>
              <h3>{post.body}</h3>
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
