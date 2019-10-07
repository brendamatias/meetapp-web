import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignUp() {
  function handleSubmit({ email, password }) {
    console.tron(email, password);
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
