import styled from "@emotion/styled";

export const main = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

export const modalBox = styled.div`
  width: 1100px;
  height: 700px;
  border-radius: 20px;
  background: #fff;
`;

export const top = styled.div`
  display: flex;
  width: 1100px;
  height: 80px;
  padding: 21px 27px;
  align-items: center;
  gap: 10px;
  border-radius: 20px 20px 0 0;
  border-bottom: 1px solid #d1d1d1;
  background-color: white;
`;

export const topT = styled.p`
  color: #000;
  font-family: Jua;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const buttom = styled.div`
  display: flex;
  width: 1093px;
  padding: 23px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 0 0 20px 20px;
  border-top: 1px solid #d1d1d1;
  background-color: white;
`;

export const buttomMid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const buttomMidT = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const buttomButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const buttomBtton = styled.input`
  display: flex;
  padding: 10px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #929292;
  background: #3b3b3b;
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const buttomBtton2 = styled.button`
  display: flex;
  padding: 10px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #929292;
  background: #3b3b3b;
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: #4b4b4b;
  }

  &:disabled {
    background: #6b6b6b;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const buttomBtton3 = styled.button`
  display: flex;
  padding: 10px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #929292;
  background: #d6d6d6;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: #c6c6c6;
  }
`;

export const buttomBtton4 = styled.button`
  display: flex;
  padding: 10px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #e1e1e1;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: #d1d1d1;
  }
`;

export const mid = styled.div`
  width: 1100px;
  height: 496px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const midMid = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #d5d5d5;
  background: #e6e6e6;
`;

export const midMidMid = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const midMidMidLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  height: 100%;
`;

export const midMidMidLeftTdiv = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  justify-content: space-around;
`;

export const midMidMidLeftT = styled.p`
  color: #000;
  font-family: Jua;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 400px;
`;

export const midMidMidLeftScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #000;
  background: #fff;
  border-radius: 10px;
`;

export const Ball = styled.div`
  position: absolute;
  top: ${(props) => props.$position}%;
  left: 50%;
  transform: translate(-50%, -20px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff6b6b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: none;
  z-index: 10;
`;

export const midMidMidRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const midMidMidRightlineDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 10px 0;
`;

export const midMidMidRightlineDivT = styled.p`
  color: #000;
  font-family: Jua;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
`;

export const midMidMidline = styled.div`
  width: 30px;
  height: 1px;
  border-bottom: 2px solid #000;
`;
