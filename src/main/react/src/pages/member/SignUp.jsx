import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Container, Items } from "../../css/member/LoginCss";
import { Modal } from "../../utils/member/MemberModal";
import { MemberAxiosApi } from "../../api/member/MemberAxiosApi";
import { PopUpAddress } from "../../components/member/PopUpAddress";
import styled from "styled-components";
import { EmailVerification } from "../../components/member/EmailVerification";
import { StyledTitle } from "../../css/common/StyledTitle";

const AddressInputCss = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &.item2 {
    margin: 0.6vh;
  }

  input {
    margin-right: 0.6vw;
    width: 100%;
    height: auto;
    line-height: normal;
    padding: 1em;
    border: 1px solid #999;
    border-radius: 18px;
    outline-style: none;
  }
`;

export const SignUp = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPassWord, setInputPassWord] = useState("");
  const [inputConPassWord, setInputConPassWord] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNum, setInputPhoneNum] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputAdd, setInputAdd] = useState("");
  const [inputAdd2, setInputAdd2] = useState("");
  const [inputAdd3, setInputAdd3] = useState("");

  // 오류 메시지
  const [passWordMessage, setPassWordMessage] = useState("");
  const [conPassWordMessage, setConPassWordMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [phoneNumMessage, setPhoneNumMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPassWord, setIsPassWord] = useState(false);
  const [isConPassWord, setIsConPassWord] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPhoneNum, setIsPhoneNum] = useState(false);
  const [totalAddress, setTotalAddress] = useState("");

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setMailMessage("올바른 형식 입니다.");
      setIsEmail(true);
      memberRegCheck(e.target.value);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPassWord(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPassWordMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassWord(false);
    } else {
      setPassWordMessage("안전한 비밀번호에요 : )");
      setIsPassWord(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPassWord(passwordCurrent);
    if (passwordCurrent !== inputPassWord) {
      setConPassWordMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPassWord(false);
    } else {
      setConPassWordMessage("비밀 번호가 일치 합니다. )");
      setIsConPassWord(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };

  const onChangePhoneNum = (e) => {
    const phoneNumRegex = /^\d{2,3}-\d{3,4}-\d{3,4}$/;
    setInputPhoneNum(e.target.value);
    if (!phoneNumRegex.test(e.target.value)) {
      setPhoneNumMessage("전화번호 형식이 올바르지 않습니다.");
      setIsPhoneNum(false);
    } else {
      setPhoneNumMessage("올바른 형식입니다.");
      setIsPhoneNum(true);
    }
  };

  const onChangeNickName = (e) => {
    setInputNickName(e.target.value);
    setIsNickName(true);
    nicknameCheck(e.target.value);
  };

  const onChangeAdd3 = (e) => {
    setInputAdd3(e.target.value); // inputAdd3으로 하면 한글자씩 밀린다.

    // 세 개로 나눠진 주소를 하나의 변수에 저장
    setTotalAddress(inputAdd + "/" + inputAdd2 + "/" + e.target.value);
  };

  // 회원 가입 여부 확인, 즉 이메일 중복 확인
  const memberRegCheck = async (userEmail) => {
    try {
      const resp = await MemberAxiosApi.memberRegCheck(userEmail);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data === true) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsEmail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsEmail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 별명 중복 확인
  const nicknameCheck = async (nickName) => {
    try {
      const resp = await MemberAxiosApi.nicknameCheck(nickName);
      console.log("별명 중복 확인 : ", resp.data);

      if (resp.data === true) {
        setNickNameMessage("사용 가능한 별명입니다.");
        setIsNickName(true);
      } else {
        setNickNameMessage("중복된 별명입니다.");
        setIsNickName(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLogin = async () => {
    const memberReg = await MemberAxiosApi.memberReg(
      inputEmail,
      inputPassWord,
      inputName,
      inputNickName,
      inputPhoneNum,
      totalAddress
    );
    console.log(memberReg.data);
    if (memberReg.data.email === inputEmail) {
      navigate("/");
    } else {
      setModalOpen(true);
      setModelText("회원 가입에 실패 했습니다.");
    }
  };

  return (
    <Container>
      <StyledTitle>회원가입</StyledTitle>

      <Items className="item2">
        <Input
          type="email"
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeMail}
        />
      </Items>

      <Items className="hint">
        {inputEmail.length > 0 && (
          <span className={`message ${isEmail ? "success" : "error"}`}>
            {mailMessage}
          </span>
        )}
      </Items>

      <EmailVerification
        email={inputEmail}
        onVerification={setIsVerified}
        onVerifiedEmail={setInputEmail}
      />

      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPassWord}
          onChange={onChangePw}
        />
      </Items>

      <Items className="hint">
        {inputPassWord.length > 0 && (
          <span className={`message ${isPassWord ? "success" : "error"}`}>
            {passWordMessage}
          </span>
        )}
      </Items>

      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드 확인"
          value={inputConPassWord}
          onChange={onChangeConPw}
        />
      </Items>

      <Items className="hint">
        {inputPassWord.length > 0 && (
          <span className={`message ${isConPassWord ? "success" : "error"}`}>
            {conPassWordMessage}
          </span>
        )}
      </Items>

      <Items className="item2">
        <Input
          type="text"
          placeholder="이름"
          value={inputName}
          onChange={onChangeName}
        />
      </Items>

      <Items className="item2">
        <Input
          type="text"
          placeholder="별명"
          value={inputNickName}
          onChange={onChangeNickName}
        />
      </Items>

      <Items className="hint">
        {inputNickName.length > 0 && (
          <span className={`message ${isNickName ? "success" : "error"}`}>
            {nickNameMessage}
          </span>
        )}
      </Items>

      <Items className="item2">
        <Input
          type="text"
          placeholder="전화 번호"
          value={inputPhoneNum}
          onChange={onChangePhoneNum}
        />
      </Items>

      <Items className="hint">
        {inputEmail.length > 0 && (
          <span className={`message ${isPhoneNum ? "success" : "error"}`}>
            {phoneNumMessage}
          </span>
        )}
      </Items>

      {/* ======================= 주소 입력 ======================= */}
      <AddressInputCss className="item2">
        <PopUpAddress
          setInputAdd={setInputAdd}
          setInputAdd2={setInputAdd2}
        ></PopUpAddress>
      </AddressInputCss>

      <AddressInputCss className="item2">
        {/* 
          inputAdd : 사용자가 선택한 주소로, 사용자가 주소를 선택하면, handlePostCode 함수에서 setInputAdd를 호출하여, inputAdd 상태를 업데이트한다.
          inputAdd2 : 도로명 주소
          inputAdd3 : 사용자가 직접 입력하는 상세 주소
        */}
        {inputAdd && <Input type="addr" value={inputAdd} />}
      </AddressInputCss>

      <AddressInputCss className="item2">
        {inputAdd2 && (
          <>
            <Input type="addr" value={inputAdd2} />
            <AddressInputCss className="item2">
              <input
                type="addr"
                placeholder="상세주소"
                value={inputAdd3}
                onChange={onChangeAdd3}
              />
            </AddressInputCss>
          </>
        )}
      </AddressInputCss>
      {/* ======================================================= */}

      <Items className="item2">
        {isEmail &&
        isPassWord &&
        isConPassWord &&
        isName &&
        isNickName &&
        totalAddress &&
        isPhoneNum &&
        isVerified ? (
          <Button enabled onClick={onClickLogin}>
            회원가입
          </Button>
        ) : (
          <Button disabled>회원가입</Button>
        )}
        <Modal open={modalOpen} close={closeModal} header="오류">
          {modalText}
        </Modal>
      </Items>
    </Container>
  );
};
