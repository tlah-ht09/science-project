import { useEffect, useState } from "react";
import * as _ from "./modal.js";
import { GoogleGenAI } from "@google/genai";

const JEM_API = import.meta.env.VITE_JEM_API_KEY;

const ai = new GoogleGenAI({ apiKey: JEM_API });

export const Main_modal = ({ mass, height, PE, KE, v, onClose }) => {
  const [url, setUrl] = useState("");

  const [geminiResult, setGeminiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //유효성 검사
  const getMimeTypeAndValidate = (url) => {
    const cleanedUrl = url.split("?")[0].toLowerCase();
    const parts = cleanedUrl.split(".");
    const extension = parts.length > 1 ? parts.pop() : "";

    const extensionMap = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    };

    const mimeType = extensionMap[extension];

    if (!mimeType) {
      return { isValid: false, mimeType: null };
    }

    return { isValid: true, mimeType: mimeType };
  };

  //제미니 사용
  const handleAddImage = async () => {
    if (!url) {
      alert("이미지 경로를 입력해주세요.");
      return;
    }

    const { isValid, mimeType } = getMimeTypeAndValidate(url);
    console.log(mimeType);

    const response = await fetch("http://localhost:4000/api/images/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
      }),
    });
    const blob = await response.blob();

    if (!isValid) {
      alert(
        "URL이 지원되는 이미지 확장자(.jpg, .png, .webp)로 끝나지 않으면 분석할 수 없습니다."
      );
      return;
    }

    if (typeof ai === "undefined") {
      alert(
        "Gemini AI 클라이언트(ai)가 정의되지 않았습니다! 상단에 import 및 초기화 코드를 확인하세요."
      );
      return;
    }

    setIsLoading(true);
    setGeminiResult("이미지 분석 중...");

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      console.log(base64.slice(0, 50));

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: "이 이미지가 살아있는 생물이면 true, 아니면 false 반환해줘",
            },
            {
              inlineData: {
                data: base64,
                mimeType: mimeType,
              },
            },
          ],
        },
      ];

      try {
        const response = ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
        });
        console.log(response.text);

        setGeminiResult(response.text);
      } catch (error) {
        console.error("오류 발생:", error);

        setGeminiResult("오류 발생: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(blob);
  };

  return (
    <_.main>
      <_.modalBox>
        <_.top>
          <_.topT>자유낙하 시뮬레이션</_.topT>
        </_.top>
        <_.mid>
          <_.midMid>
            <_.midMidMid>
              <_.midMidMidLeft>
                <_.midMidMidLeftTdiv>
                  <_.midMidMidLeftT>속도 : {v.toFixed(2)}</_.midMidMidLeftT>
                  <_.midMidMidLeftT>운동에너지 : {KE}</_.midMidMidLeftT>
                </_.midMidMidLeftTdiv>
                <_.midMidMidLeftScreen></_.midMidMidLeftScreen>
              </_.midMidMidLeft>
              <_.midMidMidRight>
                <_.midMidMidRightlineDiv>
                  <_.midMidMidRightlineDivT>
                    {height}높이(m)
                  </_.midMidMidRightlineDivT>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                  <_.midMidMidline></_.midMidMidline>
                </_.midMidMidRightlineDiv>
              </_.midMidMidRight>
            </_.midMidMid>
          </_.midMid>
        </_.mid>
        <_.buttom>
          <_.buttomMid>
            <_.buttomMidT>
              질량 : {mass} kg | 초기 높이 : {height}m{" "}
            </_.buttomMidT>
            <_.buttomButtonDiv>
              <_.buttomBtton
                placeholder="이미지 경로"
                type="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              ></_.buttomBtton>
              <_.buttomBtton2>추가하기</_.buttomBtton2>
              <_.buttomBtton2>재생</_.buttomBtton2>
              <_.buttomBtton3>리셋</_.buttomBtton3>
              <_.buttomBtton4 onClick={onClose}>닫기</_.buttomBtton4>
            </_.buttomButtonDiv>
          </_.buttomMid>
        </_.buttom>
      </_.modalBox>
    </_.main>
  );
};
