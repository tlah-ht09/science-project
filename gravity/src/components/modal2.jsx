import { useEffect, useState } from "react";
import * as _ from "./modal2.js";

export const Modal2 = () => {
  const [blackList, setBlackList] = useState(null);

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
    console.log("블랙리스트 상태 변경:", blackList);
  }, [blackList]);

  return (
    <_.ModalWrapper>
      <_.Modal>
        <_.iconDiv></_.iconDiv>
        <_.main>
          {blackList?.map((item, index) => {
            return (
              <_.textDiv key={index}>
                <_.text>{item.user_email}</_.text>
              </_.textDiv>
            );
          })}
        </_.main>
      </_.Modal>
    </_.ModalWrapper>
  );
};
