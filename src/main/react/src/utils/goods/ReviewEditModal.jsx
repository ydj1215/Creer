import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaStar } from "react-icons/fa";
import { storage } from "../../api/FireBase";
import { AnotherButton } from "../../css/common/AnotherButton";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0);
  }
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 50%;
  max-width: 1000px;
  height: auto;
  text-align: center;
  margin: 0 20px;
  animation: ${slideUp} 0.5s;
  display: flex;
  flex-direction: column;
  .content1{
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: row;
  @media (max-width: 970px) {
    flex-direction: column;
   margin-left: 25px;
   margin:  0 auto;
   justify-content: center;
  }
}
.content1-1{
  width: 150px;
  height: 30px;
  font-size: 1.1em;
display: flex;
justify-content: end;
@media (max-width: 970px) {
   justify-content: center;
 width: 100%;
  }
}
.content1-2{
  width: 100%;
  height: 30px;
  margin-left: 10px;
  display: flex;
  justify-content: start;
  @media (max-width: 970px) {
   justify-content: center;
 width: 100%;
  }
}

.content2{
  margin-top: 15px;
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: row;
  @media (max-width: 970px) {
    flex-direction: column;
 
  }



  .content2-1{
    width: 150px;
  height: 30px;
  font-size: 1.1em;
display: flex;
justify-content: end;
@media (max-width: 970px) {
   justify-content: center;
   width: 100%;
 
  }
}
.content2-2{
  width: 100%;
  height: 300px;
  margin-left: 10px; 
  @media (max-width: 970px) {
   justify-content: start;
   margin-left: 25px;
 
  }
}

}
.content3{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-top: 20px;
}
.content3-1{
  width: 150px;
  height: 30px;
 font-size: 1.1em;
display: flex;
justify-content: end;
}
.content3-2{
  width: 100%;
  height: 30px;
  margin-top: 30px;
  margin-left: 10px;
  display: flex;
  flex-direction: row  ;
  justify-content: start;
 align-items: end;
  img{
    width: 60px;
  height: 60px;
  }

}
.content3-3{
width: 150px;
height: 100%;

}
.contentImg{

img{
  border: 1px solid #7c7c7c;
  width: 350px;
  height: 350px;
}
}
.content4{
  margin: 0 auto;
  margin-top: 20px;
  width: 400px;
  height: 50px;
  display: flex;
  justify-content:center;  
   button{
    margin: 0 20px;
   }  
}

`;


const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #ff0606;
`;


const Star = styled(FaStar)`
  font-size: 32px;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  width: 85%;
  width: 85%;
  float: left;
  height: 300px;
`;

export const ReviewEditModal = ({ Writer, goodsReviewId, reviewContent, reviewUrl, reviewStar, isOpen, onSubmit, closeModal }) => {
  //리뷰 내용
  const [reviewText, setReviewText] = useState(reviewContent);
  //별점
  const [rating, setRating] = useState(reviewStar);
  const [hoverRating, setHoverRating] = useState(0);
  const NickName = window.localStorage.getItem("NickName");
  //이미지 주소
  const [url, setUrl] = useState(reviewUrl);

  const reviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const ratingChange = (value) => {
    setRating(value);
  };

  const mouseEnter = (value) => {
    setHoverRating(value);
  };

  const mouseLeave = () => {
    setHoverRating(0);
  };

  //파이어베이스 이미지 주소 받기
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      setUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const submitReview = () => {
    if (!reviewText.trim()) {
      // 텍스트가 비어 있는지 확인
      alert("리뷰 내용을 입력해주세요."); // 알림 표시
      return;
    }
    onSubmit({ rating, reviewText, goodsReviewId, url });
    closeModal();
  };
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 바깥 부분 클릭 시 모달 닫기
    }
  };
  const closeClick = () => {
    //취소 버튼 클릭시 기존 데이터 삭제 
    setReviewText('')
    setRating('')
    setUrl('')
    //Modal 닫음
    closeModal()
  }
  useEffect(() => {
    setReviewText(reviewContent)
    setRating(reviewStar)
    setUrl(reviewUrl)
  }, [reviewContent, reviewStar, reviewUrl,])
  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={modalClick}>
          <ModalContent>
            {NickName === Writer ? (<>
              <div className="contentImg">
                <img src={reviewUrl} alt="" ></img>
              </div>
              <div className="content1">
                <div className="content1-1">
                  별점
                </div>
                <div className="content1-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      onClick={() => ratingChange(value)}
                      onMouseEnter={() => mouseEnter(value)}
                      onMouseLeave={mouseLeave}
                      color={
                        value <= (hoverRating || rating) ? "#fff453" : "gray"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="content2">
                <div className="content2-1">
                  상세리뷰
                </div>
                <div className="content2-2">
                  <TextArea
                    id="reviewText"
                    value={reviewText}
                    onChange={reviewTextChange}
                    required
                  />
                </div>
              </div>
              <div className="content3">
                <div className="content3-1">
                  사진 첨부
                </div>
                <div className="content3-2">
                  <div className="content3-3">
                    <input type="file" onChange={handleFileUpload} />
                  </div>
                  <div className="content3-4">
                    <img src={url} alt="" ></img>
                  </div>
                </div>
              </div></>
            ) : (<>    <div className="contentImg">
              <img src={reviewUrl} alt="" ></img>
            </div>
              <div className="content1">
                <div className="content1-1">
                  별점
                </div>
                <div className="content1-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      color={value <= (hoverRating || rating) ? "#fff453" : "gray"}
                    />
                  ))}
                </div>
              </div>
              <div className="content2">
                <div className="content2-1">
                  상세리뷰
                </div>
                <div className="content2-2">
                  <TextArea
                    id="reviewText"
                    value={reviewText}
                    required
                  />
                </div>
              </div>
            </>
            )}

            {NickName === Writer ?

              <div className="content4">
                <AnotherButton value={"수 정"} onClick={submitReview}></AnotherButton>
                <AnotherButton value={"취 소"} onClick={closeClick}></AnotherButton>
              </div>
              : <div className="content4">
                <AnotherButton value={"확 인"} onClick={closeClick}></AnotherButton>
              </div>}
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalContent>
        </ModalWrapper >
      )}
    </>
  );
};
