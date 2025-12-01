import { useState } from "react";
import * as _ from "./main_mid";


export const Main_mid = () => {
  const [mass, setMass] = useState(0);  
  const [height, setHeight] = useState(0); 

  const g = 9.8;

  const PE = mass * g * height;  
  const v = Math.sqrt(2 * g * height); 
  const KE = 0.5 * mass * v * v;
  return (
    <_.mid>
        <_.mid_mid>
            <_.mid_top>
              <_.midLeft>
                <_.midLeftTop>
                  <_.midLeftTopT>무게 (kg)</_.midLeftTopT>
                  <_.midLeftTopIn type="number" value={mass} onChange={(e) => setMass(Number(e.target.value))}/>
                </_.midLeftTop>
                <_.midLeftMid>
                  <_.midLeftMidText1>위치에너지(PE)</_.midLeftMidText1>
                  <_.midLeftMidOut>{PE.toFixed(2)}</_.midLeftMidOut>
                  <_.midLeftMidText2>PE = mgh</_.midLeftMidText2>
                </_.midLeftMid>
                <_.midLeftButtom>
                  <_.midLeftButtomText1>낙하 높이</_.midLeftButtomText1>
                  <_.midLeftButtomOut>{height}</_.midLeftButtomOut>
                  <_.midLeftButtomText2>처음 높이</_.midLeftButtomText2>
                </_.midLeftButtom>
              </_.midLeft>
              <_.midRight>
                  <_.midRightTop>
                    <_.midRightTopT>높이 (m)</_.midRightTopT>
                    <_.midRightTopIn type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}/>
                  </_.midRightTop>
                  <_.midRightMid>
                    <_.midRightMidText1>최대 운동에너지 (KE)</_.midRightMidText1>
                    <_.midRightMidOut>{KE.toFixed(2)}</_.midRightMidOut>
                    <_.midRightMidText2>KE = 1/2 mv2</_.midRightMidText2>
                  </_.midRightMid>
                  <_.midRightButtom>
                    <_.midRightButtomText1>낙하 속력</_.midRightButtomText1>
                    <_.midRightButtomOut>{v.toFixed(2)}</_.midRightButtomOut>
                    <_.midRightButtomText2>최종 낙하 속력</_.midRightButtomText2>
                  </_.midRightButtom>
              </_.midRight>
            </_.mid_top>
            <_.midSrtButton>시뮬레이션 시작</_.midSrtButton>
        </_.mid_mid>
    </_.mid>
  )
};
