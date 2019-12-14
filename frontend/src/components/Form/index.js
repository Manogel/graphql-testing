import React, { useState } from "react";

import { Container } from "./styles";

export default function Form({ onHandleComment }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function setNewComment(e) {
    e.preventDefault();
    onHandleComment(name, content);
  }

  return (
    <Container onSubmit={e => setNewComment(e)}>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Digite seu comentário"
        value={content}
        onChange={e => setContent(e.target.value)}
        multiple
      />
      <button type="submit">Comentar</button>
    </Container>
  );
}
