import { useState } from "react";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import { useNavigate } from "react-router-dom/dist";
import { Modal } from "../../utils/member/MyPageModal";
import { MyPageAxiosApi } from "../../api/member/MyPageAxiosApi";
import { PopUpAddress } from "../member/PopUpAddress";

export const MyPageAddress = () => {
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
    // 입력한 비밀번호가 맞으면 주소 변경 진행
    if (res.data) {
      setCheckedInfo(true);
      setOldIsVisible(false);
      setNewIsVisible(true);
      setMsg("주소를 입력하세요.");
    } else {
      setPwMsg("비밀번호가 틀렸습니다.");
    }
  };

  // 변경할 주소
  const [newAddress, setNewAddress] = useState("");
  const [newRoad, setNewRoad] = useState("");
  const [newPostCode, setNewPostCode] = useState("");
  const [msg, setMsg] = useState("");
  const onModifyAddress = async (e) => {
    setMsg("");
    if (newRoad !== "" && e.target.value !== "") {
      setNewAddress(`${newRoad}/${newPostCode}/${e.target.value}`);
      setMsg("유효한 주소입니다.");
      setCheckTrue(true);
    } else {
      setMsg("주소를 모두 기입해주세요.");
      setCheckTrue(false);
    }
  };

  // 주소 변경
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickModifyAddress = async () => {
    setMsg("주소 변경 중...");
    try {
      const res = await MyPageAxiosApi.modifyAddress(newAddress);
      if (res.data === true) {
        setRst(true);
      }
    } catch (error) {
      console.error("주소 변경 중 오류 발생:", error);
      setMsg("주소 변경에 실패했습니다. 다른 주소를 입력해주세요.");
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
              주소 변경
            </h1>
            <p>
              주소를 변경합니다. 회원 정보 확인을 위해서 비밀번호를 입력하세요.
            </p>

            <InpuTitle>
              <InputBox
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
              <p>새로운 주소를 등록하시오.</p>
              <PopUpAddress
                setInputAdd={setNewRoad}
                setInputAdd2={setNewPostCode}
              ></PopUpAddress>
              {/* TODO: CSS 필요 */}
              <div>{newRoad}</div>
              <div>{newPostCode}</div>
              <InputBox
                height="100%"
                width="70%"
                placeholder="NEW ADDRESS"
                type="text"
                onChange={onModifyAddress}
                onBlur={onModifyAddress}
                onFocus={onModifyAddress}
              />
              <p>{msg}</p>
              {checkTrue && (
                <MyPageButton onClick={onClickModifyAddress}>
                  정보 변경
                </MyPageButton>
              )}
              <Modal open={rst} close={closeModal}>
                주소가 변경되었습니다.
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};
