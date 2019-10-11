import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;

  label {
    cursor: pointer;
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.4);
    transition: background 0.3s;
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    img {
      width: 100%;
    }

    input {
      display: none;
    }
  }
`;
