import React from "react";

import { Container } from "./styles";

export default function Comment({ id, name, content, onDeleteComment }) {
  return (
    <Container className="comment" onClick={() => onDeleteComment(id)}>
      <p className="comment-name">Nome: {name}</p>
      <p>{content}</p>
    </Container>
  );
}
