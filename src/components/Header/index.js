import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <Profile>
            <div>
              <strong>Brenda Matias</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>

            <button type="button" onClick={handleSignout}>
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
