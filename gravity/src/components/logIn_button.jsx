import React, { useEffect, useRef, useState } from "react";
import * as _ from "./logIn_button.js";

const GOOGLE_CLIENT_ID =
  "882080808606-ropjbujfvhnotfp8qp9gjhdittk9pcb0.apps.googleusercontent.com";

export const CustomGoogleButton = () => {
  const tokenClientRef = useRef(null);
  const [mesage, setMesage] = useState("로그인");

  useEffect(() => {
    // OAuth2 토큰 클라이언트 초기화
    if (window.google && GOOGLE_CLIENT_ID) {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (response) => {
          const accessToken = response.access_token;

          const userInfo = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ).then((res) => res.json());

          console.log("사용자 정보:", userInfo);
          setMesage(userInfo.name);
          alert(`환영합니다, ${userInfo.name}!`);
        },
      });
    }
  }, []);

  const handleLoginClick = () => {
    if (!tokenClientRef.current) {
      console.error("Token client가 아직 준비되지 않았습니다.");
      return;
    }

    // 팝업 띄우고 로그인 요청
    tokenClientRef.current.requestAccessToken();
  };

  return <_.logButton onClick={handleLoginClick}>{mesage}</_.logButton>;
};
