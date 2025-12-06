import styled from "styled-components";

export const ModalWrapper = styled.div`
  top: 680px;
  left: 1200px;
  width: 200px;

  display: flex;

  position: absolute;
`;

export const Modal = styled.div`
  width: 204px;
  height: 401px;
  border-radius: 10px;
  background: #d1d1d1;
  overflow-y: scroll;
`;

export const main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  background: #d1d1d1;
  gap: 22px;

  margin-top: 40px;
`;

export const textDiv = styled.div`
  width: 50px;
  height: 20px;
  display: flex;
  padding: 17px 57px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: white;

  margin: 0 auto;
`;

export const text = styled.p`
  color: #000;
  font-family: Jua;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
