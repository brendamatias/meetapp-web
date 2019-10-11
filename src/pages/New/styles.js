import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 20px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: ${colors.pink};
      margin: 0 0 10px;
      font-weight: bold;
    }

    div {
      display: flex;
      justify-content: flex-end;

      button {
        margin-top: 20px;
        padding: 12px 30px;
        background: ${colors.pink};
        color: #fff;
        font-weight: bold;
        border-radius: 4px;
        border: 0;
        transition: background 0.2s;
        max-width: 180px;

        &:hover {
          background: ${darken(0.03, colors.pink)};
        }
      }
    }
  }
`;
