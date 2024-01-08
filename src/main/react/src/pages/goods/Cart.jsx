import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cartImg from "../../images/cart.png";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";
import { StyledTitle } from "../../css/common/StyledTitle";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useNavigate } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";

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
  align-items: center;
  width: 100%;
  height: 100px;
  .goodsInfo {
    display: flex;
    width: 100%;
    .goodsImage {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
    .removeButton {
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      width: calc(100% - (150px + 10% + 20% + 15%));
      height: 200px;
      margin-right: 10px;
    }
    .quantity {
      flex: none;
      min-width: 30px;
      width: 10%;
    }
    .btn {
      flex: none;
      min-width: 50px;
      width: 20%;
    }
    .price {
      flex: none;
      min-width: 50px;
      width: 15%;
    }
  }
`;

export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartId, setCartId] = useState("");
  const fetchCartItems = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await CartAxiosApi.getCartItems();
        // console.log("장바구니 목록 : " + JSON.stringify(response));

        if (response.status === 200) {
          setCartItems(response.data);
          console.log("cartItems : " + JSON.stringify(response));
        } else {
          console.error("장바구니 가져오기 실패");
        }
      } else {
        console.error("accessToken이 없습니다.");
      }
    } catch (error) {
      console.error("장바구니 목록을 가져오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const checkboxChange = (goodsId) => {
    if (checkedItems.includes(goodsId)) {
      setCheckedItems(checkedItems.filter((id) => id !== goodsId));
    } else {
      setCheckedItems([...checkedItems, goodsId]);
    }
  };

  const purchaseSelected = (e) => {
    // setLink()
    navigate(`/Goods/Payment/` + e);
  };

  const remove = async () => {
    try {
      const response = await CartAxiosApi.removeFromCart(cartId);
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

  const move = (e) => {
    navigate(`/goods/` + e);
  };
  return (
    <>
      <MiddleOrderBox>
        <CartPageContainer>
          <StyledTitle>
            <img src={cartImg} alt="장바구니" style={{ width: "45px" }}></img>
            장바구니
          </StyledTitle>
          {cartItems &&
            cartItems.map((item, i) => (
              <GoodsCard key={i}>
                <div className="goodsInfo">
                  {/* 정보 추가 */}
                  <div
                    onClick={() => {
                      move(item.goodsDetailId);
                    }}
                  >
                    <img
                      src={item.goodsImg}
                      alt={item.title}
                      className="goodsImage"
                    />
                    <div className="title">
                      {item.title}
                      {item.option}
                    </div>
                    <div className="price">{item.price}원</div>
                    <div className="quantity">{item.quantity}개</div>
                    <div className="price">{item.quantity * item.price}원</div>
                  </div>
                  <div className="btn">
                    <MiddleOrderBox>
                      <AnotherButton
                        onClick={() => purchaseSelected(item.cartId)}
                        value="구매하기"
                        width="50px"
                        height="50px"
                      ></AnotherButton>
                    </MiddleOrderBox>
                    <AnotherButton
                      onClick={() => {
                        setCartId(item.cartId)
                        setModalOpen(!modalOpen)
                      }}
                      value="삭제"
                      width="50px"
                      height="50px"
                    ></AnotherButton>
                  </div>
                </div>
              </GoodsCard>
            ))}
          <CheckModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onSubmit={remove}
            checkMmessage={"상품을 장바구니에서 제거합니다."}
          />
        </CartPageContainer>
      </MiddleOrderBox>
    </>
  );
};
