import { useState } from "react";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import { useNavigate } from "react-router-dom/dist";
import { MyPageAxiosApi } from "../../api/member/MyPageAxiosApi";
import { Modal } from "../../utils/member/MyPageModal";

export const MyPagePW = () => {
  const navigate = useNavigate();

  const [pw, setPw] = useState("");

  //모달창 제어
  const [rst, setRst] = useState(false);
  const closeModal = () => {
    setRst(false);
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
    // 입력한 비밀번호가 맞으면 비밀번호 변경 진행
    if (res.data) {
      setCheckedInfo(true);
      setOldIsVisible(false);
      setNewIsVisible(true);
    } else {
      setPwMsg("비밀번호가 틀렸습니다.");
    }
  };

  // 변경 비밀번호 제약 조건
  const [newPw, setNewPw] = useState("");
  const [msg, setMsg] = useState("");
  const onModifyPw = (e) => {
    setMsg("");
    if (/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/.test(e.target.value)) {
      setMsg("유효합니다.");
      setNewPw(e.target.value);
      console.log(checkTrue);
      setCheckTrue(true);
    } else {
      setMsg("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setCheckTrue(false);
    }
  };

  // 비밀번호 변경 클릭 함수
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickModifyPw = async () => {
    setMsg("비밀번호 변경 중...");
    try {
      //   const hashedPassword = sha256(inputPw).toString();
      const res = await MyPageAxiosApi.modifyPW(newPw);
      if (res.data === true) {
        setRst(true);
      }
    } catch (error) {
      console.error("PW 변경 중 오류 발생:", error);
      setMsg("비밀번호 변경에 실패했습니다. 다시 입력해주세요.");
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
              비밀번호 변경
            </h1>
            <p>
              비밀번호를 변경합니다. 회원 정보 확인을 위해서 현재 비밀번호를
              입력하세요.
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
              <p>새로운 비밀번호를 입력하시오.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="NEW PW"
                type="password"
                onChange={onModifyPw}
              />
              <p>{msg}</p>
              {checkTrue && (
                <MyPageButton onClick={onClickModifyPw}>정보 변경</MyPageButton>
              )}
              <Modal open={rst} close={closeModal}>
                비밀번호가 변경되었습니다.
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};
