import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const OptionAxiosApi = {


  //옵션 추가
  insertOption: async (num, updatedArray) => {

    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/option/new/${num}`, updatedArray, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};  
