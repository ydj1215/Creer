import styled from "styled-components";
import { PurchaseModal } from "../../utils/goods/PurchaseModal";
import { CartModal } from "../../utils/goods/CartModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoodsPurchaseBlock = styled.div`
  color: #999;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  min-height: 100vh;
  max-width: 1200px; // 컨테이너의 최대 너비 설정
  margin: 0; // 좌우 중앙에 배치
  padding: 2rem;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0 15px 35px 15px; // 화면이 768px 이하일 때 패딩 변경
  }
  .coverimg {
    flex: 0 0 50%;
    padding: 16px;
    position: absolute;
    left: 50%;
    transform: translateX(-100%);
    z-index: 1;

    img {
      display: block;
      height: auto;
      object-fit: cover;
      width: 100%;
    }
  }

  .info {
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 14px 18px rgba(0, 0, 0, 0.06);
    padding: 32px 24px;
    z-index: 0;
    position: absolute;
    left: 50%;
    transform: translateX(0);
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
    text-transform: uppercase; /* 텍스트를 대문자로 변환 */
  }

  hr {
    position: relative;
    border: none;
    border-top: 1px solid #999;
    font: 26px sans-serif;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
    margin: 0;
    height: 50px;
    &:before {
      position: relative;
      top: -12px;
      color: #999;
      content: "༺⁜࿇⁜༻";
    }
    &:after {
      position: absolute;
      left: 50%;
      margin-left: -10px;
      top: 22px;
      color: #999;
      content: "★";
    }
  }
  .coverimg,
  .info {
    flex: 1 0 50%;
  }

  .contents {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    h2 {
      position: relative;
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 1000px;
      padding-bottom: 8px;
      -webkit-font-smoothing: antialiased;
      color: #333;
      padding: 10px 0 8px 0;
      border-bottom: 2px solid #7d8e9e;
      text-transform: uppercase; /* 텍스트를 대문자로 변환 */
    }

    .coverimg {
      margin-right: 1rem;

      img {
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .info {
      h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
        margin-top: 0.5rem;
      }

      .buttons {
        margin-top: 1em;

        button {
          margin-right: 1em;
          padding: 0.75em 1.5em;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #0056b3;
          }
        }
      }
    }
  }
`;

export const PurchaseComp = ({
  info,
  isLoggedIn,
  isInCart,
  isPurchased,
  onAddToCart,
  onPurchase,
  GoodsUrl,
}) => {
  const { title, author, publisher, price, description, imageUrl } = info;
  const navigate = useNavigate();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const openPurchaseModal = () => {
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  const addToCart = () => {
    openCartModal();
  };

  const purchaseGoods = () => {
    openPurchaseModal();
  };

  const goToViewerPage = () => {
    navigate("/viewerpage", { state: { contentUrl: GoodsUrl } });
  };

  return (
    <GoodsPurchaseBlock>
      <div className="contents">
        <h2>책 정보</h2>
        <div className="coverimg">
          {imageUrl && <img src={imageUrl} alt="CoverImage" />}
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>저자: {author}</p>
          <p>출판사: {publisher}</p>
          <p>가격: {price} 원</p>
          <p>{description}</p>
          <div className="buttons">
            {isPurchased ? (
              <button onClick={goToViewerPage}>뷰어 열기</button>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <button onClick={addToCart}>
                      {isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
                    </button>
                    <button onClick={purchaseGoods}>구매하기</button>
                  </>
                ) : (
                  <button>로그인이 필요합니다</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={cartModalOpen}
        closeModal={closeCartModal}
        onConfirm={() => {
          onAddToCart();
          closeCartModal();
        }}
        action={isInCart ? "remove" : "add"}
      />
      <PurchaseModal
        isOpen={purchaseModalOpen}
        closeModal={closePurchaseModal}
        onConfirm={() => {
          onPurchase();
          closePurchaseModal();
        }}
        action="purchase"
      />
    </GoodsPurchaseBlock>
  );
};
