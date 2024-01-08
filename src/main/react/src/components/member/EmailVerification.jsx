import React, { useState, useEffect } from "react";
import { EmailAxiosApi } from "../../api/member/EmailAxiosApi";
import { AnotherButton } from "../../css/common/AnotherButton";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";

export const EmailVerification = ({
  email,
  onVerification,
  onVerifiedEmail,
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const sendVerificationEmail = async () => {
    try {
      const response = await EmailAxiosApi.sendVerificationEmail(email);
      console.log("Response" + response.data);
      if (response.data === true) {
        setIsEmailSent(true);
        setVerificationMessage("인증 코드를 전송했습니다.");
      } else {
        setVerificationMessage("인증 코드 전송에 실패했습니다.");
      }
    } catch (e) {
      console.error("이메일 전송 중 오류 발생:", e);
      setVerificationMessage("오류 발생: " + e.message);
    }
  };

  const verifyEmail = async () => {
    try {
      // 프론트엔드에서 백엔드로 인증 코드와 이메일 전송
      const response = await EmailAxiosApi.verifyEmail(email, verificationCode);
      if (response.data === true) {
        setIsVerified(true);
        setVerificationMessage("이메일이 성공적으로 인증되었습니다!");
        onVerifiedEmail(email); //부모 컴포넌트로 신호 보내기
      } else {
        setVerificationMessage("이메일 인증에 실패했습니다.");
      }
    } catch (e) {
      console.error("이메일 인증 중 오류 발생:", e);
      setVerificationMessage("오류 발생: " + e.message);
    }
  };

  useEffect(() => {
    // isVerified 상태가 변경될 때 onVerification을 호출
    onVerification(isVerified);
  }, [isVerified, onVerification]);

  return (
    <div>
      {isEmailSent ? (
        <div style={{ textAlign: "center" }}>
          <input
            disabled={isVerified}
            type="text"
            placeholder="인증 코드 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            style={{
              fontSize: "15px",
              backgroundColor: "rgb(241,241,241)",
              color: "black",
              border: "none",
              borderRadius: "10px",
              margin: "5px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            disabled={isVerified}
            type="button"
            onClick={verifyEmail}
          >
            인증 완료
          </button>
        </div>
      ) : (
        <MiddleOrderBox>
          <AnotherButton
            onClick={() => sendVerificationEmail()}
            value="인증번호 전송"
          ></AnotherButton>
        </MiddleOrderBox>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};
