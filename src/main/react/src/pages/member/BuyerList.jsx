import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cartImg from "../../images/cart.png";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";
import { StyledTitle } from "../../css/common/StyledTitle";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useNavigate } from "react-router-dom";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";

const CartPageContainer = styled.div`
  margin: 20px;
  width: 80%;
  max-width: 1280px;

`;

const GoodsCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  height: 100px;

  .goodsInfo2 {
    font-size: .8em;
    display: flex;
justify-content: space-between;
align-items: center;
    width: 80%;   
    height: 50%;
    .title2{   
      display: flex;
      margin: 10px;
      width: 100%;
      flex-wrap: nowrap;
    }
  }
  .goodsInfo {
    display: flex;
justify-content: center;
align-items: center;
    width: 100%;
    height: 50%;
  .goodsImage {
    width: 100px;
    height: 100px;
    margin-top: 50px;
    position: relative;
  }
  img{
    margin: 0;
    }
  .removeButton {

    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  } 
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    width: calc(100% - (150px +  10% + 15%));
    height: auto;
    margin-right: 10px;
  }
.quantity{
      flex: none;
    min-width: 30px;
    width: 10%;
}
  .price{
    flex: none;
    min-width: 50px;
    width: 15%;
  }
  }
  
`;


export const BuyerList = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [cartItems, setCartItems] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const fetchCartItems = async () => {
    try {
      const response = await PurchaseAxiosApi.getMyPurchase();
      if (response.status === 200) {
        setCartItems(response.data);
        console.log(response.data);
        console.log(response.data);
        console.log(response.data);

      } else {
        console.error("장바구니 가져오기 실패");
      }
    } catch (error) {
      console.error("장바구니 목록을 가져오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCartItems();
    }
  }, [accessToken]);
  const remove = async (num) => {
    try {
      const response = await CartAxiosApi.removeFromCart(accessToken, num);
      if (response.status === 200) {
        if (window.confirm("장바구니에서 해당 책을 삭제하시겠습니까?")) {
          fetchCartItems();
        }
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인:", error);
    }
  };
  const purchaseSelected = (e) => {
    // setLink()
    navigate(`/Goods/Payment/` + e)
  };
  const move = (e) => {
    navigate(`/goods/` + e)
  }
  return (
    <>
      <MiddleOrderBox>
        <CartPageContainer>
          <StyledTitle>
            <img src={cartImg} alt="장바구니" style={{ width: "45px" }}></img>
            구매 목록
          </StyledTitle>
          {cartItems && cartItems.map((item, i) => (
            <GoodsCard key={i}>
              <div className="goodsInfo" >
                {/* 정보 추가 */}
                <div onClick={() => { move(item.goodsDetailId) }}>
                  <img src={item.goodsDetailId.goodsPic} alt={item.title} className="goodsImage" />
                  <div className="title" >{item.goodsDetailId.goodsTitle}{item.option}</div>

                  <div className="price">{item.goodsDetailId.goodsPrice}원</div>
                  <div className="quantity">{item.quantity}개</div>
                  <div className="price">{item.quantity * item.goodsDetailId.goodsPrice}원</div>
                </div>
              </div>
              <div className="goodsInfo2" >
                {/* 정보 추가 */}
                <div className="title2" >배송 주소 :{item.receiveAdd}</div>
                <div className="title2" >성함:{item.receiveName}</div>
                <div className="title2" >연락처 :{item.receiveNumber}</div>
                {/* <div className="title2" >결재 상태:{item.status}</div> */}
              </div>
            </GoodsCard>
          ))}
        </CartPageContainer>
      </MiddleOrderBox>
      {/* <AnotherButton
              onClick={() => purchaseSelected(item.cartId)}
              value="배송지"
              width="50px"
                    height="50px"
            ></AnotherButton> */}
    </>
  );
};
