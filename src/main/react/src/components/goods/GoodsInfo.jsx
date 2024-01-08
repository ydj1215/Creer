import styled, { css } from "styled-components";
import { ReviewComp } from "./ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { useEffect, useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { useNavigate } from "react-router-dom";
import { SelectImg } from "./SelectImg";

import * as DOMPurify from 'dompurify';
const GoodsInfoCss = styled.div`
    width: 65%;
    height: auto;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
        margin-top: 50px;
    }
   
`;

const ImgCategory = styled.div`
  width: 95%;
  height: auto;
  display: flex;
   flex-direction: column;
  .ImgCategory1{
    width: 100%;
    height: 470px;
  }
  .ImgCategory2{
    width: 100%;
    height: auto;

  }
`
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
    .mainImg{ 
        width: 450px;
        height: auto;
        display: flex;
        justify-content: center;
        img{
          border: 1px solid rgba(171, 171, 171, 0.5);
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`     
       width: 80%;
    height: auto;
    border:  1px solid black;
    margin: 20px auto;    
    input{
     width: 90%;  
    }
`;
const InfoCategory = styled.div`
margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;
ul{  
  margin: 0;
padding: 0;
  display: flex;
    li{  
     width: 150px;

     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
const InfoDescCss = styled.div`
width: 99%; 
border: none;
border-radius: 4px;
font-size: 16px;
height: 600px;
img{
  width: 100%; 
  height: auto;
}
`;

const NewImgBox = styled.div`
width: 100%;
height: auto;
text-align: center;
img{
  width: 150px;
  height: 150px;
}

`;

export const GoodsInfo = ({ list, reply, member }) => {
    const navigate = useNavigate();
    const [goodsDetailId, goodsDesc, goodsPic, setGoodsDesc, setGoodsPic] = list;
    //Modal Switch
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    //작성자와 로그인 유저 확인용
    const user = localStorage.getItem("userId");
    //상품 대표 이미지
    const [url, setUrl] = useState(list[2]);
    //상품 대표 이미지
    const [mainurl, setMainUrl] = useState(list[2]);
    //상품 대표 이미지 변경시 사용
    const [newUrl, setNewUrl] = useState('');
    //리뷰 모달 닫기
    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };
    //리뷰 모달 열기
    const openReviewModal = () => {
        setIsReviewModalOpen(true);

    }
    //상품 정보 수정
    const descChage = (e) => {
        setGoodsDesc(e.target.value)
    }
    useEffect(() => {
        setUrl(list[2])
        setMainUrl(list[2])
    }, [list])

    //리뷰 추가
    const reviewSubmit = async ({ rating, reviewText, url }) => {
        try {
            // 서버에 데이터 전송
            const response = await ReviewAxiosApi.insertReview(
                rating, reviewText, goodsDetailId, url
            );
            if (response.status === 200) {
                // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
                closeReviewModal();
                navigate(0)
            } else {
                // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
                console.error("서버 응답 실패");
            }
        } catch (error) {
            // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
            console.error("submit review 데이터에러 :", error);
        }
    };



    const imgview = (e) => {
        setUrl(e)
    }

    const InfoDesc = ({ value }) => {
        const processedDesc = DOMPurify.sanitize(value);
        return <div dangerouslySetInnerHTML={{ __html: processedDesc }} />;
    }
    return (
        <GoodsInfoCss>
            <ImgCategory>
                <div className="ImgCategory1">
                    <ImgBox>
                        <div className="mainImg">
                            <img src={url} alt="대표 이미지" />

                        </div>
                    </ImgBox>
                </div>
                <div className="ImgCategory2">
                    <SelectImg num={list[0]} url={mainurl} imgview={imgview} member={member}>
                    </SelectImg>
                </div>
                <NewImgBox>
                    {newUrl && <>
                        <img src={newUrl} alt="새 이미지" />
                    </>
                    }
                </NewImgBox>

            </ImgCategory>
            <InfoCategory>
                <ul>
                    <li>소개</li>
                    <li>댓글</li>
                    <li>판매자</li>
                </ul>
            </InfoCategory>
            <InfoBox>
                {/* 상품 정보 표시 */}
                <InfoDescCss>
                    <InfoDesc value={(goodsDesc)}
                        placeholder="내용"></InfoDesc>
                </InfoDescCss>

                <div
                    style={{
                        width: "100px",
                        whiteSpace: "normal",
                    }}

                />
                {/* 리뷰 출력 */}
                <ReviewComp goodsNum={list[0]} reply={reply}
                    openReviewModal={openReviewModal}></ReviewComp>

                {/* 리뷰 작성 Madal */}
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onSubmit={reviewSubmit}
                    closeModal={closeReviewModal}
                />
            </InfoBox>


        </GoodsInfoCss>
    )
}