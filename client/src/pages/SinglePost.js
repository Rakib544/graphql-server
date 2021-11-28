import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });

  console.log(data);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <div>Hello world</div>;
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
