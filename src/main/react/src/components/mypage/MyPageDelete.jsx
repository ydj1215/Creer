import { useState } from "react";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import { Modal } from "../../utils/member/MyPageModal";
import { MyPageAxiosApi } from "../../api/member/MyPageAxiosApi";
import { useNavigate } from "react-router-dom";

export const MyPageDELETE = ({ id }) => {
  const navigate = useNavigate();

  const [pw, setPw] = useState("");

  //모달창 제어
  const [rst, setRst] = useState(false);
  const closeModal = () => {
    setRst(false);
    // 로그아웃
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");

  // 비밀번호 제약 조건
  const onChangePw = (e) => {
    const inputPw = e.target.value;
    if (/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/.test(inputPw)) {
      setPw(e.target.value);
      setPwMsg("유효합니다.");
      setCheckPw(true);
    } else {
      // dispatch({ type: 'Password', value: false });
      setPwMsg("유효하지 않습니다.");
      setCheckPw(false);
    }
  };

  // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  // 체크
  const [checkPw, setCheckPw] = useState(false);
  const allChecksTrue = () => {
    return checkPw;
  };

  // 백엔드 이후 체크된 정보를 토대로 true or false
  const [checkedInfo, setCheckedInfo] = useState(false);

  const onClickCheck = async () => {
    const res = await MyPageAxiosApi.memberCheck(pw);
    // 입력한 비밀번호가 맞으면 탈퇴 진행
    if (res.data) {
      setCheckedInfo(true);
      setOldIsVisible(false);
      setNewIsVisible(true);
    } else {
      setPwMsg("비밀번호가 틀렸습니다.");
    }
  };

  // 이메일로 삭제할 회원 정보 재확인
  const [delEmail, setDelEmail] = useState("");
  const [msg, setMsg] = useState("");
  const onDeleteId = (e) => {
    setMsg("");
    if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(e.target.value)) {
      setMsg("유효합니다.");
      setDelEmail(e.target.value);
      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
  };
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickDeleteId = async () => {
    setMsg("회원 탈퇴 중...");
    try {
      const response = await MyPageAxiosApi.memberDel(delEmail);

      // 회원의 이메일이 일치해야 탈퇴 가능
      if (response.data === true) {
        setRst(true);
      } else {
        setMsg("이메일이 일치하지 않습니다.");
      }
    } catch (error) {
      setMsg("회원 탈퇴에 실패했습니다.");
      console.error("회원 탈퇴 도중에 오류가 발생했습니다 : ", error);
    }
  };

  // 정보 제출 이후에 조건이 달성되면 해당 페이지 사라지고 다음 페이지 등장
  const [isOldVisible, setOldIsVisible] = useState(true);
  const [isNewVisible, setNewIsVisible] = useState(false);

  return (
    <>
      {isOldVisible && (
        <>
          <InputTag>
            <h1
              style={{
                border: "bold",
                fontSize: "1.5rem",
                borderBottom: "3px solid black",
              }}
            >
              회원 탈퇴
            </h1>
            <p>
              회원을 탈퇴합니다. 회원 정보 확인을 위해 비밀번호를 입력하세요.
            </p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="비밀번호"
                type="password"
                onChange={onChangePw}
              />
            </InpuTitle>
            <p>{msgPw}</p>

            <MyPageButton onClick={onClickCheck} disabled={!allChecksTrue()}>
              정보 확인
            </MyPageButton>
          </InputTag>
        </>
      )}

      {isNewVisible && (
        <InputTag height="30%">
          {checkedInfo && (
            <>
              <p>회원 탈퇴할 이메일을 입력하세요.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="이메일"
                type="text"
                onChange={onDeleteId}
              />
              <p>{msg}</p>
              {checkTrue && (
                <MyPageButton onClick={onClickDeleteId}>회원 탈퇴</MyPageButton>
              )}
              <Modal open={rst} close={closeModal}>
                회원을 탈퇴하셨습니다..
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};
