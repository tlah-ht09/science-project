import { useEffect, useState } from "react";
import * as _ from "./modal2.js";

import { useAtomValue } from "jotai";
import { blackList } from "../atom.js";
export const Modal2 = () => {
  const blackLists = useAtomValue(blackList);

  return (
    <_.ModalWrapper>
      <_.Modal>
        <_.main>
          {blackLists?.map((item, index) => {
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
