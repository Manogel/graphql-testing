import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Form from "./components/Form";
import Comment from "./components/Comment";

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
  const { loading, error, data: commentsData, refetch } = useQuery(
    GET_COMMENTS
  );
  const [saveComment, { data }] = useMutation(INSERT_COMMENTS);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return "Deu ruim";

  function handleComment(name, content) {
    saveComment({ variables: { name, content } });
    refetch();
  }

  function handleDeleteComment(id) {
    deleteComment({ variables: { id } });
    refetch();
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
            {commentsData.comments.map(({ id, name, content }) => (
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
