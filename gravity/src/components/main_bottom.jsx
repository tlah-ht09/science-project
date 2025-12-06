import { useState } from "react";
import * as _ from "./main_bottom";
import { Modal2 } from "./modal2.jsx";

export const Main_bottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <_.Main>
        <_.Text>@made by 곰돌이미역 먹는 말미잘</_.Text>
        <_.blackLiks onClick={handleOpenModal}>블랙리스트</_.blackLiks>
      </_.Main>

      {isModalOpen && <Modal2></Modal2>}
    </>
  );
};
