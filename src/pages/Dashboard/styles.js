import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  color: #fff;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;

    strong {
      font-size: 32px;
    }

    a {
      display: flex;
      align-items: center;
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

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const MeetupCard = styled.li`
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border-radius: 4px;
  margin-bottom: 10px;

  a {
    font-size: 18px;
    color: #fff;
  }

  time {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
  }
`;

export const NoMeetup = styled.div`
  margin-top: 150px;

  display: flex;
  flex-direction: column;

  align-items: center;

  span {
    margin-top: 15px;
    font-size: 24px;
  }
`;

export const Pagination = styled.footer`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding-top: 6px;
    border: 0;
    background: transparent;
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  margin-top: 150px;
  justify-content: center;
  align-items: center;
`;
