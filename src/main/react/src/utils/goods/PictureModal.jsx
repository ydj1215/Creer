
import styled, { keyframes } from "styled-components";
import { storage } from "../../api/FireBase";
import { useEffect, useState } from "react";
import { PictureAxiosApi } from "../../api/goods/PictureAxiosApi";

const ModalClickCss = styled.div`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  flex-direction:column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999;
`;


const Message = styled.div`
  width: 600px;
  height: 50px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  ul{
    display: flex;
    flex-direction: row;
  }
`;
const Img = styled.div`
background: white;
margin-top: 20px;
border-radius: 20px;
width: 580px;
height  :150px ;
display: flex;
padding: 10px;
justify-content: center;
`;
const UploadInput = styled.input`
position: relative;

  display: none;
`;

const UploadLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 150px;
  height: 50px;
  margin: 20px;
  background-color: #adaaff;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #00648b;
  }
`;

export const PictureModal = ({ isOpen, setIsCheckModalOpen, checkMmessage, submitUrl, pictureId }) => {

  const [url, setUrl] = useState();
  const [newUrl, setNewUrl] = useState();
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL(); console.log("저장경로 확인 : " + url);
      setNewUrl(url)
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCheckModalOpen(); // 모달 바깥 부분 클릭 시 모달 닫기
    }
  };
  //확인버튼 누르면
  const CheckClick = () => {
    //onSubmit 로 받은 함수실행
    updateimg()
    //Modal 닫음
    setIsCheckModalOpen()
  }
  //취소버튼 누르면
  const closeClick = () => {
    //Modal 닫음
    setIsCheckModalOpen()
    setNewUrl('')
  }
  useEffect(() => {
    setUrl(submitUrl)
  }, [submitUrl])

  const updateimg = async () => {
    try {
      // 서버에 데이터 전송
      const response = await PictureAxiosApi.updatePictureImg(
        pictureId, newUrl
      );
      if (response.status === 200) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
        window.location.reload();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }

  }

  return (
    <ModalClickCss>

      {isOpen && (<>
        <ModalWrapper ModalWrapper onClick={modalClick}>
          <Message>{checkMmessage}</Message>
          <Img> <img src={url} alt=""></img> </Img>
          {newUrl &&
            <Img> <img src={newUrl} alt=""></img></Img>
          }

          <Button>
            <ul>
              <li>
                <UploadLabel>
                  확인
                  <UploadInput type="button" onClick={CheckClick} >
                  </UploadInput>
                </UploadLabel></li>
              <li>    <UploadLabel>
                이미지 변경
                <UploadInput type="file" onChange={handleFileUpload} />
              </UploadLabel></li>
              <li>
                <UploadLabel>
                  취소
                  <UploadInput type="button" onClick={closeClick} />
                </UploadLabel>
              </li>
            </ul>




          </Button>
        </ModalWrapper ></>
      )}
    </ModalClickCss>
  );
};
