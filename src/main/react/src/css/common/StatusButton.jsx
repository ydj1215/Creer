import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PurchaseAxiosApi } from '../../api/goods/PurchaseAxiosApi';

const BtnCss = styled.div`
  width: 100%;
  height: 20px;
display: flex;
flex-direction: row;
background: white;
float: right;  

  input {

    flex: 1;
    width: 60px;
    height: 10px;
  }
`;
export const StatusButton = ({ id, status, setStatus, statusOn, setStatusOn, memberRegCheck }) => {
  const click = (e) => {
    updateStatus(e.target.value); // 변경된 값으로 updateStatus 호출
    setStatusOn(false);
  }

  const updateStatus = async (newContent) => {
    try {
      const update = await PurchaseAxiosApi.update(id, newContent); // content 대신 newContent를 넘겨줌
      memberRegCheck()
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {id === statusOn ? (
        <BtnCss>
          <input
            type="radio"
            name="goods"
            id="결제 전"
            value="결제 전"
            onChange={(e) => { click(e) }}
            checked={status === '결제 전'}
          />
          결제 전
          <input
            type="radio"
            name="goods"
            id="결제 확인"
            value="결제 확인"
            onChange={(e) => { click(e) }}
            checked={status === '결제 확인'}
          />
          결제 확인
          <input
            type="radio"
            name="goods"
            id="배송 중"
            value="배송중"
            onChange={(e) => { click(e) }}
            checked={status === '배송중'}
          />
          배송 중
          <input
            type="radio"
            name="goods"
            id="배송 확인"
            value="배송 확인"
            onChange={(e) => { click(e) }}
            checked={status === '배송 확인'}
          />
          배송 확인
        </BtnCss>
      ) : <></>}
    </>
  );
};