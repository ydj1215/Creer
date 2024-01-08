import React from "react";
import styled, { keyframes } from "styled-components";


const ModalWrapper = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalContent = styled.div`
  width: 80%; 
  border: 1px solid black;
  border-radius: 0.3rem;
 .a{
  width: 100%;
 height:500px;
  background-color: #ffffff;
 }
`;export const PurchaseListModal = ({ isOpen, closeModal, onConfirm }) => {
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 바깥 영역 클릭 시 닫기
    }
  };

  return (
    <ModalWrapper open={isOpen} onClick={modalClick}>
      <ModalContent>
        {/* 모달 내용 */}
        <div className="a" onClick={modalClick}>111</div>
      </ModalContent>
    </ModalWrapper>
  );
};