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
  background: #D1D1D1;
  overflow-y : scroll;
  
`;

export const main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column; 
  justify-content : center;

  background: #D1D1D1;
  gap: 22px;

  margin-top:40px;
`;

export const textDiv = styled.div`
  width:50px;
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

export const iconDiv = styled.image`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
  </svg>
`;
