import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
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

    textarea {
      padding-top: 20px;
      resize: none;
      height: 200px;
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
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        padding: 12px 30px;
        background: ${colors.pink};
        font-weight: bold;
        border-radius: 4px;
        border: 0;
        transition: background 0.2s;
        max-width: 185px;
        color: #fff;

        svg {
          margin-right: 5px;
        }

        &:hover {
          background: ${darken(0.03, colors.pink)};
        }
      }
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  margin-top: 150px;
  justify-content: center;
  align-items: center;
`;
