import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AnotherButton } from "../../css/common/AnotherButton";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999;
`;

const Message = styled.div`
p{
  margin-top: 20px;
}
  width: 600px;
  height: 180px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Button = styled.div`
display: flex;
justify-content: space-between;
width: 350px;
margin:  20px;
`;

export const CheckModal = ({
  // 기본값 설정
  modalOpen = false,
  setModalOpen = () => { },
  onSubmit = () => { },
  checkMmessage = "",
  revertChanges = () => { },
  type,
}) => {
  const navigate = useNavigate();
  // 모달 바깥 부분 클릭 시,
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen();
    }
  };

  //확인버튼 누르면
  const CheckClick = () => {
    onSubmit();
    setModalOpen();
    navigate(0)
  };
  const CheckClick2 = () => {
    onSubmit();
    setModalOpen();
  };

  //취소버튼 누르면
  const closeClick = () => {
    revertChanges();
    setModalOpen();
  };

  return (
    <ModalClickCss>
      {modalOpen && (
        <>
          <ModalWrapper ModalWrapper onClick={modalClick}>
            <Message>
              <p>{checkMmessage}</p>
              <Button>
                {type !== 'noNavi' ?
                  <AnotherButton value={'확인'} onClick={CheckClick}></AnotherButton>
                  :
                  <AnotherButton value={'확인'} onClick={CheckClick2}></AnotherButton>
                }
                <AnotherButton value={'취소'} onClick={closeClick}></AnotherButton>
              </Button>
            </Message>
          </ModalWrapper>
        </>
      )}
    </ModalClickCss>
  );
};
