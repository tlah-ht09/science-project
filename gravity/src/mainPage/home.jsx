import { Main_bottom } from "../components/main_bottom.jsx";
import { Main_mid } from "../components/main_mid.jsx";
import { MainTop } from "../components/main_top.jsx";
import { Main_modal } from "../components/modal.jsx";
import * as _ from "./homeStyle.js";

const Home = () => {
  return (
    <_.Main_Div>
      <MainTop></MainTop>
      <Main_mid></Main_mid>
      <Main_bottom />
      <Main_modal/>
    </_.Main_Div>
  );
};

export default Home;
