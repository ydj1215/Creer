import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const MyPageAxiosApi = {
  // 정보 수정을 위해서 입력 받은 정보들이 존재하는지 확인
  memberCheck: async (password) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + "/MyPage/checkInfo",
      {
        password,
      },
      {
        headers: {
          // 설정 객체
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 회원 탈퇴
  memberDel: async (email) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("회원 탈퇴할 회원의 이메일 : " + email);
    return await axios.delete(KH_DOMAIN + "/MyPage/delete", {
      headers: {
        "X-Email": email,
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 정보 변경 전 정보 중복 체크
  checkedId: async (NewId) => {
    try {
      const checkId = {
        id: NewId,
      };
      console.log("중복성 체크 아이디:" + NewId);
      return await axios.post(KH_DOMAIN + "/MyPage/checkId", checkId);
    } catch (error) {
      throw error;
    }
  },
  // 아이디 비밀번호 변경
  modifyID: async (currentId, newId) => {
    try {
      const updateId = {
        currentId: currentId,
        newId: newId,
      };
      console.log("현재 아이디" + currentId);
      console.log("새로운 아이디" + newId);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/MyPage/updateId", updateId);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyEmail: async (email) => {
    const token = localStorage.getItem("accessToken");
    try {
      return await axios.put(
        KH_DOMAIN + "/MyPage/updateEmail",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("이메일 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyName: async (nickName) => {
    const token = localStorage.getItem("accessToken");
    try {
      return await axios.put(
        KH_DOMAIN + "/MyPage/updateName",
        { nickName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("별명 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyPW: async (password) => {
    try {
      const token = localStorage.getItem("accessToken");
      return await axios.put(
        KH_DOMAIN + "/MyPage/updatePw",
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyAddress: async (address) => {
    const token = localStorage.getItem("accessToken");
    try {
      return await axios.put(
        KH_DOMAIN + "/MyPage/updateAddress",
        { address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("주소 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyPhone: async (phoneNum) => {
    const token = localStorage.getItem("accessToken");
    try {
      return await axios.put(
        KH_DOMAIN + "/MyPage/updatePhone",
        { phoneNum },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("전화번호 변경 중 오류 발생:", error);
      throw error;
    }
  },
  // 이미지 등록
  setImageUrl: async (id, image) => {
    const setImageUrl = {
      id,
      image,
    };
    console.log("axios url : " + image);
    return await axios.post(KH_DOMAIN + "/MyPage/setImage", setImageUrl);
  },
};
