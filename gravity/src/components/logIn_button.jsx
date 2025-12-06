import React, { useEffect, useRef, useState } from "react";
import * as _ from "./logIn_button.js";
import { useSetAtom } from "jotai";
import { user_id, user_email } from "../atom.js";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_API;

export const CustomGoogleButton = () => {
  const setUserId = useSetAtom(user_id);
  const setUserEmail = useSetAtom(user_email);
  const [userInfo, setUserInfo] = useState(null);
  const tokenClientRef = useRef(null);
  const [mesage, setMesage] = useState("로그인");

  const [idInfo, setIdInfo] = useState(null);

  useEffect(() => {
    if (userInfo?.email != null || userInfo?.name != null) {
      fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userInfo.email,
          user_name: userInfo.name,
        }),
      });
    }

    setUserEmail(userInfo?.email);

    const fetchId = async () => {
      const res = await fetch(
        `http://localhost:4000/api/users/id?user_email=${userInfo?.email}`
      );
      const data = await res.json();

      setIdInfo(data.user_id);
    };

    fetchId();
  }, [userInfo]);

  useEffect(() => {
    if (idInfo != null) {
      console.log(idInfo);
      setUserId(idInfo);
    }
  }, [idInfo]);

  useEffect(() => {
    // OAuth2 토큰 클라이언트 초기화
    if (window.google && GOOGLE_CLIENT_ID) {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (response) => {
          const accessToken = response.access_token;

          const info = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ).then((res) => res.json());
          setUserInfo(info);
          console.log("사용자 정보:", info);
          setMesage(info.name);
          alert(`환영합니다, ${info.name}!`);
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
