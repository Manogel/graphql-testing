import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { print } from "graphql";
import { gql } from "apollo-boost";
import Form from "./components/Form";
import Comment from "./components/Comment";
import client from "./services/api";

const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
      createdAt
      updatedAt
    }
  }
`;

const INSERT_COMMENTS = gql`
  mutation SaveComent($name: String!, $content: String!) {
    saveComment(input: { name: $name, content: $content }) {
      name
      content
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      name
      content
    }
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);
  /* const { loading, error, data: commentsData, refetch } = useQuery(
    GET_COMMENTS
  );
  const [saveComment, { data }] = useMutation(INSERT_COMMENTS);
  const [deleteComment] = useMutation(DELETE_COMMENT); */

  useEffect(() => {
    async function getComments() {
      const response = await client.post("", {
        query: `
          query {
            comments {
              id
              name
              content
              createdAt
              updatedAt
            }
        }
        `
      });
      console.log(response);
      setComments(response.data.data.comments);
    }
    getComments();
    setLoading(false);
  }, []);

  // if (error) return "Deu ruim";

  async function handleComment(name, content) {
    //saveComment({ variables: { name, content } });
    //refetch();
    const response = await client.post("", {
      query: `
        mutation SaveComent($name: String!, $content: String!) {
          created: saveComment(input: {name: $name, content: $content}) {
            id
            name
            content
        }
      }
      `,
      variables: { name, content }
    });
    const { created } = response.data.data;
    setComments([created, ...comments]);
  }

  async function handleDeleteComment(id) {
    // deleteComment({ variables: { id } });
    //refetch();
    await client.post("", {
      query: `
        mutation DeleteComment($id: String!) {
          deleted: deleteComment(id: $id) {
            id
            name
            content
          }
      }
      `,
      variables: { id: String(id) }
    });
    setComments(comments.filter(comment => comment.id !== id));
  }

  return (
    <>
      <h1>Teste server with GraphQL</h1>
      {loading ? (
        "Carregando..."
      ) : (
        <>
          <Form onHandleComment={handleComment} />
          <section className="comments">
            {comments?.map(({ id, name, content }) => (
              <Comment
                key={id}
                id={id}
                name={name}
                content={content}
                onDeleteComment={handleDeleteComment}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default App;
