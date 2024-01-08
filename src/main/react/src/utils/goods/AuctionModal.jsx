import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useState } from "react";
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
width: 80%;
margin:  20px;
button{
  margin: 0 10px;
}

`;

export const AuctionModal = ({
  // 기본값 설정
  modalOpen = false,
  setModalOpen = () => { },
  onSubmit = () => { },
  newPrice,
  setNewPrice,
  checkMmessage = "",
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  // 모달 바깥 부분 클릭 시,
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen();
    }
  };

  //확인버튼 누르면
  const CheckClick = (e) => {
    onSubmit(e);
    setModalOpen();
    // navigate(0)
  };


  //취소버튼 누르면
  const closeClick = () => {
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
                <AnotherButton width={"700px"} value={'500원'} onClick={() => CheckClick(500)}></AnotherButton>
                <AnotherButton width={"700px"} value={'1000원'} onClick={() => CheckClick(1000)}></AnotherButton>
                <AnotherButton width={"700px"} value={'5000원'} onClick={() => CheckClick(5000)}></AnotherButton>
                <AnotherButton width={"700px"} value={'10000원'} onClick={() => CheckClick(10000)}></AnotherButton>
                <AnotherButton width={"700px"} value={'취소'} onClick={closeClick}></AnotherButton>
              </Button>
            </Message>
          </ModalWrapper>
        </>
      )}
    </ModalClickCss>
  );
};
