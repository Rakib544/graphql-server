import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";

const PostForm = () => {
  const { onSubmit, handleChange, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    },
  });

  console.log(error);

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1>Create a Post: </h1>
      <Form.Field>
        <Form.Input
          placeholder="Write Post..."
          name="body"
          onChange={handleChange}
          value={values.body}
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default PostForm;
