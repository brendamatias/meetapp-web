import styled from 'styled-components';
import { darken } from 'polished';

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
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  margin-top: 150px;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  border: 0;
  border-radius: 4px;
  height: 42px;
  padding: 0 25px;
  color: #fff;
  font-weight: bold;
  background: ${props => props.color};
  margin-left: 15px;

  &:hover {
    background: ${props => darken(0.03, props.color)};
  }
`;

export const Meetup = styled.div`
  img {
    width: 100%;
    height: 300px;
    border-radius: 4px;
    margin-bottom: 25px;
  }

  p {
    color: #fff;
    margin-bottom: 30px;
    font-size: 18px;
  }

  span {
    color: rgba(255, 255, 255, 0.6);
    margin-right: 30px;
  }
`;

export const CancellationModal = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  color: #fff;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  .content {
    background-color: #18161f;
    margin: 150px auto;
    padding: 40px;
    border-radius: 4px;
    width: max-content;

    header {
      .close {
        display: flex;
        align-items: center;
        margin-left: 10px;
        background: transparent;
        border: 0;
        cursor: pointer;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
