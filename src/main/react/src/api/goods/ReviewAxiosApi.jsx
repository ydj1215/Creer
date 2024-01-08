import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ReviewAxiosApi = {

  // 리뷰 작성
  insertReview: async (reviewStar, reviewText, goodsDetailId, url) => {

    const reviewData = {
      goodsDetailId: goodsDetailId,
      reviewContent: reviewText,
      reviewStar: reviewStar,
      reviewImg: url,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/Review/new/`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //리뷰 전부 가져오기
  getReviews: async (num) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/Review/list/${num}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //리뷰 한개 삭제
  deleteReview: async (num) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/Review/delete/${num}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  //리뷰 수정
  updateReview: async (reviewStar, reviewText, goodsDetailId, url) => {
    const reviewData = {
      goodsDetailId: goodsDetailId,
      reviewContent: reviewText,
      reviewStar: reviewStar,
      reviewImg: url,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/Review/update/${goodsDetailId}`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};
