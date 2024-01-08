import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const PictureAxiosApi = {

  // 상품  이미지 모두 출력
  selectGoodsImg: async (num) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(
      KH_DOMAIN + `/api/picture/list/${num}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 상품 이미지 넣기
  insertGoodsImg: async (num, newUrl) => {

    const goodsData = {
      goodsDetailId: num,
      goodsPictures: newUrl,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/picture/new/`, goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 상품  이미지 수정
  updatePictureImg: async (num, newUrl) => {
    const goodsData = {
      goodsPictureId: num,
      goodsPictures: newUrl,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/picture/update/`, goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 상품  이미지 삭제
  deletePictureImg: async (num) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.delete(
      KH_DOMAIN + `/api/picture/delete/${num}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },


};
