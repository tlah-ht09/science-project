import * as _ from "./main_mid";

export const Main_mid = () => {
  return (
    <_.mid>
        <_.mid_mid>
            <_.mid_top>
              <_.midLeft>
                <_.midLeftTop>
                  <_.midLeftTopT>무게 (kg)</_.midLeftTopT>
                  <_.midLeftTopIn type="number"></_.midLeftTopIn>
                </_.midLeftTop>
                <_.midLeftMid>
                  <_.midLeftMidText1>위치에너지(PE)</_.midLeftMidText1>
                  <_.midLeftMidOut>임시값</_.midLeftMidOut>
                  <_.midLeftMidText2>PE = mgh</_.midLeftMidText2>
                </_.midLeftMid>
                <_.midLeftButtom>
                  <_.midLeftButtomText1>낙하 높이</_.midLeftButtomText1>
                  <_.midLeftButtomOut>임시값</_.midLeftButtomOut>
                  <_.midLeftButtomText2>가을은 독서의 계절</_.midLeftButtomText2>
                </_.midLeftButtom>
              </_.midLeft>
              <_.midRight>
                  <_.midRightTop>
                    <_.midRightTopT>높이 (m)</_.midRightTopT>
                    <_.midRightTopIn type="number"></_.midRightTopIn>
                  </_.midRightTop>
                  <_.midRightMid>
                    <_.midRightMidText1>최대 운동에너지 (KE)</_.midRightMidText1>
                    <_.midRightMidOut>임시값</_.midRightMidOut>
                    <_.midRightMidText2>KE = 1/2 mv2</_.midRightMidText2>
                  </_.midRightMid>
                  <_.midRightButtom>
                    <_.midRightButtomText1>낙하 높이</_.midRightButtomText1>
                    <_.midRightButtomOut>임시값</_.midRightButtomOut>
                    <_.midRightButtomText2>최종 낙하 속력</_.midRightButtomText2>
                  </_.midRightButtom>
              </_.midRight>
            </_.mid_top>
            <_.midSrtButton>시뮬레이션 시작</_.midSrtButton>
        </_.mid_mid>
    </_.mid>
  )
};
