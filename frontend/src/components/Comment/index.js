import React from "react";

import { Container } from "./styles";

export default function Comment({ name, content }) {
  return (
    <Container className="comment">
      <p className="comment-name">Nome: {name}</p>
      <p>{content}</p>
    </Container>
  );
}
