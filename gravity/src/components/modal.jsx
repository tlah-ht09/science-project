import { useEffect, useState, useRef } from "react";
import * as _ from "./modal.js";
import { GoogleGenAI } from "@google/genai";
import { useAtomValue } from "jotai";
import { user_id, user_email } from "../atom.js";

const JEM_API = import.meta.env.VITE_JEM_API_KEY;

const ai = new GoogleGenAI({ apiKey: JEM_API });

export const Main_modal = ({ mass, height, PE, KE, v, onClose }) => {
  const [url, setUrl] = useState(null);
  const [ballUrl, setBallUrl] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 애니메이션 상태
  const [ballPosition, setBallPosition] = useState(0); // 공의 위치 (0 ~ 100%)
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const [currentKE, setCurrentKE] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const userId = useAtomValue(user_id);
  const userEmail = useAtomValue(user_email);

  useEffect(() => {
    console.log("현재 user_id:", userId);
    console.log("현재 user_email:", userEmail);
  }, []);

  useEffect(() => {
    if (result === true || result === "true") {
      alert("살아있는 생물 이미지는 사용할 수 없습니다.");
      fetch("http://localhost:4000/api/users/blacklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
        }),
      });
    } else if (result === false || result === "false") {
      console.log(result);
      console.log("dlksdkskfjdweoijfwofjoisjoiwe");
      fetch("http://localhost:4000/api/users/imgs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          img_path: url,
        }),
      });
      setBallUrl(url);
    }
    setResult("");
  }, [result]);

  // 유효성 검사
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

  const getLatesImg = async () => {
    const response = await fetch(
      `http://localhost:4000/api/users/imgs?user_id=${userId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setUrl(data.image_path);
    console.log("최근 이미지 경로:", data.image_path);
  };

  // 제미니 사용
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

    const reader = new FileReader();
    reader.onloadend = async () => {
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
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
        });
        setResult(response.text);
      } catch (error) {
        console.error("오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(blob);
  };

  // 자유낙하 애니메이션
  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = (timestamp - startTimeRef.current) / 1000; // 초 단위
    const g = 9.8; // 중력가속도 (m/s²)

    // 속도 계산: v = g * t
    const velocity = g * elapsed;

    // 낙하 거리 계산: h = (1/2) * g * t²
    const fallDistance = 0.5 * g * elapsed * elapsed;

    // 운동에너지 계산: KE = (1/2) * m * v²
    const kineticEnergy = 0.5 * mass * velocity * velocity;

    if (fallDistance >= height) {
      // 바닥에 도달
      setBallPosition(100); // 바닥에 공 유지
      setCurrentVelocity(Math.sqrt(2 * g * height));
      setCurrentKE(mass * g * height); // 최대 운동에너지 = 초기 위치에너지
      setIsPlaying(false);
      startTimeRef.current = null;
    } else {
      const percentage = (fallDistance / height) * 100;
      setBallPosition(percentage);
      setCurrentVelocity(velocity);
      setCurrentKE(kineticEnergy);
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // 재생 버튼
  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // 리셋 버튼
  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsPlaying(false);
    setBallPosition(0);
    setCurrentVelocity(0);
    setCurrentKE(0);
    startTimeRef.current = null;
  };

  // 컴포넌트 언마운트 시 애니메이션 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
                  <_.midMidMidLeftT>
                    속도 : {currentVelocity.toFixed(2)} m/s
                  </_.midMidMidLeftT>
                  <_.midMidMidLeftT>
                    운동에너지 : {currentKE.toFixed(2)} J
                  </_.midMidMidLeftT>
                </_.midMidMidLeftTdiv>
                <_.AnimationContainer>
                  <_.midMidMidLeftScreen />
                  {ballPosition >= 0 && ballPosition <= 100 && (
                    <_.Ball $position={ballPosition} src={ballUrl} />
                  )}
                </_.AnimationContainer>
              </_.midMidMidLeft>
              <_.midMidMidRight>
                <_.midMidMidRightlineDiv>
                  <_.midMidMidRightlineDivT>
                    {height}m 높이
                  </_.midMidMidRightlineDivT>
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                  <_.midMidMidline />
                </_.midMidMidRightlineDiv>
              </_.midMidMidRight>
            </_.midMidMid>
          </_.midMid>
        </_.mid>
        <_.buttom>
          <_.buttomMid>
            <_.buttomMidT>
              질량 : {mass} kg | 초기 높이 : {height}m
            </_.buttomMidT>
            <_.buttomButtonDiv>
              <_.buttomBtton
                placeholder="이미지 경로"
                type="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
              <_.buttomBtton2
                onClick={() => {
                  if (userId != undefined) {
                    handleAddImage();
                  } else {
                    alert("로그인 후 이용 가능합니다.");
                  }
                }}
                disabled={isLoading}
              >
                추가하기
              </_.buttomBtton2>
              <_.buttomBtton2 onClick={getLatesImg}>최근 이미지</_.buttomBtton2>
              <_.buttomBtton2 onClick={handlePlay} disabled={isPlaying}>
                재생
              </_.buttomBtton2>
              <_.buttomBtton3 onClick={handleReset}>리셋</_.buttomBtton3>
              <_.buttomBtton4 onClick={onClose}>닫기</_.buttomBtton4>
            </_.buttomButtonDiv>
          </_.buttomMid>
        </_.buttom>
      </_.modalBox>
    </_.main>
  );
};
