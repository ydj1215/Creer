import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const AuthAxiosApi = {
  checkLogin: async (token) => {
    const response = await axios.get(KH_DOMAIN + "/users/check-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
