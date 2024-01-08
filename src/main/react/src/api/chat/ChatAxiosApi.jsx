import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ChatAxiosApi = {
  // 메서드 내부에서는 const chatLIst = () =>{...} 와 같은 형태로 선언이 불가능

  // 채팅방 생성
  chatRoomCreate: async (goodsId) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + "/chat/new", goodsId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 채팅 기록 가져오기
  chatLoad: async (roomName) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/chat/${roomName}/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 채팅방 목록 보기
  chatList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/chat/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 채팅방 정보 가져오기
  chatInfo: async (roomId) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/chat/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};
