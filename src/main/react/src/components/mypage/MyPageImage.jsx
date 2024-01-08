import React, { useState } from "react";
import { storage } from "../../api/FireBase";
import { ImageSubmit, ImageSection, ImageUpload } from "./MyPageComp";
import { MyPageAxiosApi } from "../../api/member/MyPageAxiosApi";

export const MyPageImage = ({ id }) => {
  const [file, setFile] = useState(null);

  // 변경 감지
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  // URL 데이터 베이스에 저장
  const saveImageUrlToDatabase = async (id, url) => {
    try {
      console.log("회원의 아이디 : " + id);
      const response = await MyPageAxiosApi.setImageUrl(id, url);

      // HTTP 상태 코드 확인
      if (response.status === 200) {
        console.log("이미지 URL이 데이터베이스에 저장되었습니다.", response);
        // window.location.reload();
      } else {
        console.log("setImageUrl()가 false를 반환했습니다.", response.status);
      }
    } catch (error) {
      console.error(
        "이미지 URL을 데이터베이스에 저장하는 와중에 오류가 발생했습니다.",
        error
      );
    }
  };

  // 파이어 베이스
  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);

      await saveImageUrlToDatabase(id, url);
    } catch (error) {
      console.error("파일 업로드에 실패했습니다 :", error);
    }
    window.location.reload();
  };

  return (
    <>
      <ImageSection>
        <ImageSubmit type="file" onChange={handleFileInputChange} />
        <ImageUpload onClick={handleUploadClick}>사진 등록</ImageUpload>
      </ImageSection>
    </>
  );
};
