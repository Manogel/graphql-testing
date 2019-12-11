import React from "react";
import { useQuery } from "@apollo/react-hooks";
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

function App() {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (error) return "Deu ruim";

  return (
    <>
      <h1>Teste server with GraphQL</h1>
      {loading ? (
        "Carregando..."
      ) : (
        <>
          <Form />
          <section className="comments">
            {data.comments.map(({ id, name, content }) => (
              <Comment key={id} name={name} content={content} />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default App;
