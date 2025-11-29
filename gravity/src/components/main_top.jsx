import { CustomGoogleButton } from "./logIn_button.jsx";
import * as _ from "./main_top.js";

export const MainTop = () => {
  return (
    <_.top>
      <_.logo>자유낙하 시각화</_.logo>
      <CustomGoogleButton></CustomGoogleButton>
    </_.top>
  );
};
