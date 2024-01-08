import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const EmailAxiosApi = {
  // 이메일 보내기
  sendVerificationEmail: async (email) => {
    const sendEmail = {
      email: email,
    };

    return await axios.post(`${KH_DOMAIN}/email/send`, sendEmail);
  },

  // 이메일 인증 코드 확인
  verifyEmail: async (email, verificationCode) => {
    const verification = {
      email: email,
      code: verificationCode,
    };
    return await axios.post(`${KH_DOMAIN}/email/verify`, verification);
  },
};
