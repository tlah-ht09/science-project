import { Main_bottom } from "../components/main_bottom.jsx";
import { Main_mid } from "../components/main_mid.jsx";
import { MainTop } from "../components/main_top.jsx";
import { Main_modal } from "../components/modal.jsx";
import { useSetAtom } from "jotai";
import { blackList } from "../atom.js";
import * as _ from "./homeStyle.js";
import { useEffect, useState } from "react";

const Home = () => {
  const setList = useSetAtom(blackList);
  const [blackLists, setBlackList] = useState(null);

  useEffect(() => {
    const fetchBlackList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/blacklist"
        );
        const data = await response.json();
        setBlackList(data.blacklist);
      } catch (error) {
        console.error("블랙리스트를 불러오는 중 오류 발생:", error);
      }
    };

    fetchBlackList();
  }, []);

  useEffect(() => {
    console.log("쀏");
    console.log("블랙리스트 상태 변경:", blackLists);
    if (blackLists) {
      setList(blackLists);
    }
  }, [blackLists]);

  return (
    <_.Main_Div>
      <MainTop></MainTop>
      <Main_mid></Main_mid>
      <Main_bottom />
    </_.Main_Div>
  );
};

export default Home;
