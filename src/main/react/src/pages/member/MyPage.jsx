import { useState, useEffect } from "react";
import isEqual from "lodash/isEqual";
import {
  Container,
  Left,
  Imagine,
  InfoBox,
  RightButton,
  Right,
  RightInfo,
  SetButton,
  DivRowt,
  LeftDiv,
  Information,
  Body,
  Img,
  CloseButton,
} from "../../components/mypage/MyPageComp";
import { MyPageEmail } from "../../components/mypage/MyPageEmail";
import { MyPageAddress } from "../../components/mypage/MyPageAddress";
import { MyPagePhone } from "../../components/mypage/MyPagePhone";
import { useNavigate } from "react-router-dom";
import { MemberAxiosApi } from "../../api/member/MemberAxiosApi";
import { Modal } from "../../utils/member/MyPageModal";
import { MyPageImage } from "../../components/mypage/MyPageImage";
import { MyPagePW } from "../../components/mypage/MyPagePW";
import { MyPageDELETE } from "../../components/mypage/MyPageDelete";
import { MyPageName } from "../../components/mypage/MyPageName";

// useReducer (초기값, 상태를 업데이트하는 함수)
// ...data : 기존의 data를 새로운 객체로 복사하여 새로운 객체를 생성, 이를 통해 불병성을 유지하며 객체를 갱신 가능
export const reducer = (data, action) => {
  switch (action.type) {
    case "Email":
      return { ...data, email: action.value };
    case "Name":
      return { ...data, name: action.value };
    case "Password":
      return { ...data, password: action.value };
    case "PhoneNum":
      return { ...data, phoneNum: action.value };
    default:
      return data;
  }
};

export const MyPage = () => {
  const [member, setMember] = useState("");
  const navigate = useNavigate();
  const [memberInformation, setMemberInfo] = useState("");
  const [modal, setModal] = useState(false);
  const [memberId, setMemberId] = useState(""); // 상태 저장
  const closeModal = () => {
    setModal(false);
    navigate("/");
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await MemberAxiosApi.memberGetOne();
        console.log("마이페이지에서 회원 정보를 불러오는데 성공했습니다.");
        console.log("응답 데이터 :", JSON.stringify(rsp.data, null, 2));

        // rsp.data의 모든 속성을 업데이트
        setMemberInfo({
          ...memberInformation,
          ...rsp.data,
        });

        setMemberId(rsp.data.id);
        // member에 변경사항이 존재한다면,
        if (!isEqual(rsp.data, member)) {
          console.log("변경된 데이터:", rsp.data);
          setMember(rsp.data);

          console.log(
            "변경된 응답 데이터 :",
            JSON.stringify(rsp.data, null, 2)
          );
        } else {
          console.log("변경된 데이터가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("회원 정보를 불러오는데 실패했습니다:", error);
      }
    };

    getMember();
  }, [member]); // memberInformation 추가 시 무한 렌더링 발생

  // 초기 상태 설정
  const [rightEmail, setRightEmail] = useState(true);
  const [rightName, setRightName] = useState(false);
  const [rightPassword, setRightPassword] = useState(false);
  const [rightAddress, setRightAddress] = useState(false);
  const [rightPhone, setRightPhone] = useState(false);
  const [rightMember, setRightMember] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  const handleButtonClick = (
    isEmail,
    isName,
    isPassword,
    isAddress,
    isPhone,
    isMember
  ) => {
    setIsRightVisible(true);
    setRightEmail(isEmail);
    setRightName(isName);
    setRightPassword(isPassword);
    setRightAddress(isAddress);
    setRightPhone(isPhone);
    setRightMember(isMember);
  };

  // Email 변경 버튼 클릭
  const onClickEmail = () => {
    handleButtonClick(true, false, false, false, false, false);
  };

  const onClickName = () => {
    handleButtonClick(false, true, false, false, false, false);
  };

  // Pw 변경 버튼 클릭
  const onClickPw = () => {
    handleButtonClick(false, false, true, false, false, false);
  };

  // Address 변경 버튼 클릭
  const onClickAddress = () => {
    handleButtonClick(false, false, false, true, false, false);
  };

  // PhoneNum 변경 버튼 클릭
  const onClickPhone = () => {
    handleButtonClick(false, false, false, false, true, false);
  };

  // 회원 탈퇴 버튼 클릭
  const onClickMember = () => {
    handleButtonClick(false, false, false, false, false, true);
  };

  return (
    <Body>
      <Modal open={modal} close={closeModal}>
        로그인 상태가 아닙니다!
      </Modal>

      {/* 좌측 */}
      <Container >
        <Left>
          <Imagine>
            <Img src={memberInformation.image} alt="이미지 사진" />
            <MyPageImage id={memberId} />
          </Imagine>
          <InfoBox>
            <DivRowt>
              <Information>EMAIL.</Information>{" "}
              <Information>{memberInformation.email}</Information>
            </DivRowt>

            <DivRowt>
              <Information>NAME.</Information>{" "}
              <Information>{memberInformation.name}</Information>
            </DivRowt>

            <DivRowt>
              <Information>ADDRESS.</Information>{" "}
              <Information>{memberInformation.address}</Information>
            </DivRowt>

            <DivRowt>
              <Information>NICKNAME.</Information>{" "}
              <Information>{memberInformation.nickName}</Information>
            </DivRowt>

            <DivRowt>
              <Information>PHONE.</Information>{" "}
              <Information>{memberInformation.phoneNum}</Information>
            </DivRowt>
          </InfoBox>
          <LeftDiv>
            <SetButton onClick={onClickEmail}>이메일 변경</SetButton>
            <SetButton onClick={onClickName}>별명 변경</SetButton>
            <SetButton onClick={onClickPw}>비밀번호 변경</SetButton>
            <SetButton onClick={onClickAddress}>주소 변경</SetButton>
            <SetButton onClick={onClickPhone}>전화번호 변경</SetButton>
            <SetButton onClick={onClickMember}>회원 탈퇴</SetButton>
          </LeftDiv>
        </Left>

        {/* 우측 */}
        <Right isVisible={isRightVisible}>
          {/* 이메일 변경 */}
          {rightEmail && (
            <RightInfo>
              <MyPageEmail />
              <CloseButton onClick={onClckCloseRight}>X</CloseButton>
            </RightInfo>
          )}

          {/* 이름 변경 */}
          {rightName && (
            <RightInfo>
              <MyPageName />
              <CloseButton onClick={onClckCloseRight}>X</CloseButton>
            </RightInfo>
          )}

          {/* 패스워드 변경 */}
          {rightPassword && (
            <RightInfo>
              <MyPagePW />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}

          {/* 주소 변경 */}
          {rightAddress && (
            <RightInfo>
              <MyPageAddress />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}

          {/* 전화번호 변경 */}
          {rightPhone && (
            <RightInfo>
              <MyPagePhone />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}

          {/* 회원 탈퇴 */}
          {rightMember && (
            <RightInfo>
              <MyPageDELETE id={memberId} />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}
          <RightButton>
            <SetButton onClick={onClickEmail}>이메일 변경</SetButton>
            <SetButton onClick={onClickName}>별명 변경</SetButton>
            <SetButton onClick={onClickPw}>비밀번호 변경</SetButton>
            <SetButton onClick={onClickAddress}>주소 변경</SetButton>
            <SetButton onClick={onClickPhone}>전화번호 변경</SetButton>
            <SetButton onClick={onClickMember}>회원 탈퇴</SetButton>
          </RightButton>
        </Right>
      </Container>
    </Body>
  );
};
