import React from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { AnotherButton } from "../../css/common/AnotherButton";

// 주소 검색을 담당
const PopUpPostCss = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 10px;
`;

export const PopUpPost = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress); //주소
    console.log(data.zonecode); //지번
    props.onClose();
    props.setInputAdd(fullAddress);
    props.setInputAdd2(data.zonecode);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "480px",
    height: "480px",
    padding: "7px",
    backgroundColor: "rgb(153, 153, 153)",
  };

  return (
    <PopUpPostCss>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />

      <AnotherButton
        onClick={() => {
          props.onClose();
        }}
        value="닫기"
      ></AnotherButton>
    </PopUpPostCss>
  );
};
