import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(201, 63, 63, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 204px;
  height: 411px;
  border-radius: 10px;
  background: #d1d1d1;
`;
