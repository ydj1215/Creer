import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const MemberAxiosApi = {
  // 로그인
  memberLogin: async (email, password) => {
    console.log("로그인 : ", email, password);
    const login = {
      email,
      password,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  //회원 전체 조회
  memberGet: async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/users/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 액세스 토큰을 통한 로그인한 회원의 정보 상세 조회
  memberGetOne: async () => {
    const accessToken = await localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/member/detail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 회원 가입
  memberReg: async (email, password, name, nickName, phoneNum, address) => {
    const member = {
      email,
      password,
      name,
      nickName,
      phoneNum,
      address,
    };
    return await axios.post(KH_DOMAIN + "/auth/signup", member);
  },

  // 회원 가입 여부 확인
  memberRegCheck: async (userEmail) => {
    console.log("가입 가능 여부 확인 : ", userEmail);
    return await axios.get(KH_DOMAIN + `/auth/exists/${userEmail}`);
  },

  // 회원 정보 수정
  memberUpdate: async (userEmail, name, image) => {
    const token = localStorage.getItem("accessToken");
    console.log("회원 정보 수정 : ", userEmail, name, image);
    const member = {
      userEmail: userEmail,
      name: name,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, member, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },

  // 회원 탈퇴
  memberDel: async (userEmail) => {
    const del = {
      userEmaild: userEmail,
    };
    return await axios.post(KH_DOMAIN + "/user/delete", del);
  },

  nicknameCheck: async (nickName) => {
    return await axios.get(KH_DOMAIN + `/member/signUp/nickName/${nickName}`);
  },

  // 카카오 로그인
  kakaoLogin: async (data) => {
    return await axios.post(KH_DOMAIN + "/member/kakaoLogin", data);
  },
};
