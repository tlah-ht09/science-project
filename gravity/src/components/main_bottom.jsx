import { useState } from "react";
import * as _ from "./main_bottom";
import { Modal2 } from "./modal2.jsx";

export const Main_bottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <_.Main>
        <_.Text>@made by 곰돌이미역 먹는 말미잘</_.Text>

        {/* 이 버튼 하나로 ON / OFF */}
        <_.blackLiks onClick={handleToggleModal}>블랙리스트</_.blackLiks>
      </_.Main>

      {/* 상태에 따라 모달 표시 */}
      {isModalOpen && <Modal2 />}
    </>
  );
};
