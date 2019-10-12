import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  font-size: 14px;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      color: #999;

      &:hover {
        color: ${colors.pink};
      }
    }
  }

  button {
    background: ${colors.pink};
    border: 0;
    border-radius: 4px;
    height: 42px;
    padding: 0 25px;
    color: #fff;
    font-weight: bold;

    &:hover {
      background: ${darken(0.03, colors.pink)};
    }
  }
`;
