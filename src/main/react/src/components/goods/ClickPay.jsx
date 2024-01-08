import React, { useEffect } from 'react';
import { AnotherButton } from "../../css/common/AnotherButton";
import { useNavigate } from 'react-router-dom';
export const ClickPay = ({ price, content, addPurchase, newName, receiveAdd }) => {

  const navigate = useNavigate();

  function onClickPayment() {

    const userCode = 'imp73471357';
    const data = {
      pg: "nice_v2.nictest00m",                      // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      amount: price,                                  // 결제금액
      name: 'creer',                                // 주문명
      buyer_name: newName,                           // 구매자 이름
      buyer_tel: content.receiveNumber,                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: receiveAdd,                   // 구매자 주소                
      buyer_postcode: '',                      // 구매자 우편번호
      return_url: 'http://localhost:3000/', // 리디렉션 URL
    };
    //     /* 2. 결제 데이터 정의하기 */
    //     const data = {
    //       // pg : `html5_inicis.INIBillTst` ,
    //       // pg: 'kakaopay.TC0ONETIME',        
    //         pg: "nice_v2.nictest00m",                      // PG사
    //       pay_method: 'card',                           // 결제수단
    //       merchant_uid: `mid_${new Date().getTime()}` ,  // 주문번호
    //       amount: 100,                                 // 결제금액
    //       name: 'creer',                  // 주문명
    //       buyer_name: '홍길동',                           // 구매자 이름
    //       buyer_tel: '01012341234',                     // 구매자 전화번호
    //       buyer_email: 'example@example',               // 구매자 이메일
    //       buyer_addr: '신사동 661-16',                    // 구매자 주소                
    //       buyer_postcode: '06018', // 구매자 우편번호
    //       return_url: 'https://yourdomain.com/payment/success',
    // };


    if (isReactNative()) {
      /* 5. 리액트 네이티브 환경에 대응하기 */
      const params = {
        userCode,                                   // 가맹점 식별코드
        data,                                       // 결제 데이터
        type: 'payment',                            // 결제와 본인인증 구분을 위한 필드
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
    } else {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init(userCode);
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, callback);
    }
  }

  /* 3. 콜백 함수 정의하기 */
  const callback = async (response) => {
    // 응답 처리
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      paid_amount,
      error_code,
      // 기타 필요한 응답 데이터
    } = response;

    if (success) {
      // 결제 성공 시 처리
      console.log('결제 성공', response);
      // 성공 처리 로직 구현.
      await addPurchase();
      navigate(`/`)
    } else {
      // 결제 실패 시 처리
      console.log(`결제 실패: ${error_msg}`, response);
      // 실패 처리 로직 구현
      navigate(`/Cart`)
      addPurchase();
    }

  }
  function isReactNative() {
    return false;
  }

  return (<>
    <AnotherButton value={"결제하기"} onClick={onClickPayment}></AnotherButton>
  </>
  );
}