import React, { useState } from "react";

import { Container } from "./styles";

export default function Form() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  return (
    <Container onSubmit={e => e.preventDefault()}>
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
