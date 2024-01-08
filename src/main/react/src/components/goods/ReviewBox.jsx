import { ReviewComp } from "../../components/goods/ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";

import { useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { useNavigate } from "react-router-dom";


export const ReviewBox = ({ goodsDetailId }) => {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  }

  //리뷰 추가
  const reviewSubmit = async (reviewData) => {

    try {
      // 서버에 데이터 전송
      const response = await ReviewAxiosApi.insertReview(
        reviewData.rating, reviewData.reviewText, goodsDetailId
      );
      if (response.status === 201) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
        closeReviewModal();
        navigate(`/${goodsDetailId}`)
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }
  };

  return (
    <>
      {/* 리뷰 출력 */}
      <ReviewComp goodsNum={goodsDetailId} openReviewModal={openReviewModal}></ReviewComp>
      {/* 리뷰 작성 Madal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onSubmit={reviewSubmit}
        closeModal={closeReviewModal}
      />

    </>
  )

}