import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용

export const KH_DOMAIN = "";
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"; // http 와 https 처럼 wss 의 보안 강화
const host = window.location.host; // 현재 호스트와 포트
export const KH_SOCKET_URL = `${protocol}//${host}/ws/chat`;


// 입력을 기준으로 시간이 얼마나 지났는지 반환
export const timeFromNow = (timestamp) => {
  return moment(timestamp).fromNow();
};

// 입력된 날짜 문자열을 년월일시분 형식으로 포맷팅
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export const Common = {
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  // 액세스 토큰이 만료됐을 때, 리프레시 토큰을 통해 액세스 토큰과 리프레시 토큰을 모두 재발급
  handleUnauthorized: async () => {
    const refreshToken = Common.getRefreshToken();
    try {
      const res = await axios.post(`${KH_DOMAIN}/refresh/new`, refreshToken);
      await console.log(
        "handleUnauthorized 응답 데이터 : " + JSON.stringify(res)
      );

      // 로컬 스토리지에 저장된 토큰 덮어쓰기
      await Common.setAccessToken(res.data.accessToken);
      await Common.setRefreshToken(res.data.refreshToken);
      await alert(
        "리프레시 토큰을 통해서 액세스 토큰 및 리프레시 토큰이 재발급 되었습니다 : "
      );
      return res.data.accessToken;
    } catch (err) {
      console.log("handleUnauthorized 에서 에러가 발생했습니다!");
      return false;
    }
  },
};

// 새로고침
export const Reload = (navigate) => {
  navigate(0);
};
