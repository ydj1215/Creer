import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AuctionTime } from "../auction/AuctionTime";
import { AnotherButton } from "../../css/common/AnotherButton";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { AuctionModal } from "../../utils/goods/AuctionModal";


const GoodsOptionCss = styled.div`
  width: 35%;
  height: auto;
  @media (max-width: 768px) {
    width: 50%;
    margin: 0 auto;
    grid-area: option;
  }
`;

const Seller = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
  font-size: .8em;
`;

const Seller1 = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Seller2 = styled.div`
  width: calc(100% - 100px);
  display: flex;
  position: relative;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 10px;
`;
const Optionimage = styled.div`
  img {
    border-radius: 50px;
    border: 2px solid #a8a8a8;
    width: 80px;
    height: 80px;
    margin-bottom: 40px;
  }
`;
const OptionNick = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  left: 0;
  top: -25px;
`;
const OptionCategory = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 15px;
  display: flex;
  color: white;
  background: #adadad;
  justify-content: center;
  border: 1px solid  #727272;
`;

const OptionTitleEdit = styled.div`
  width: 100%;

  font-size: 2em;
  line-height: 1.2em;
  padding-bottom: 20px;
`;

const Participate = styled.div`

  width: 100%;
  height: auto;
  margin-top: 10px;

  .d1{   margin-top: 20px;

     font-size: 1.3em;
  }
    .d2{  margin-top: 20px;
     font-size: 1.2em;
     display: flex;
     color: #606060;
     flex-direction: column;
     padding-bottom: 20px;
     border-bottom: 1px solid #bfbebe;
  }
    .d3{
      display: flex;
      justify-content: center;
      margin-top: 20px;
     font-size: 1.3em;
  }
  input {
    margin-top: 10px;
    font-size: .7em;
    height: 30px;
    width: 100%;
  }
`;
export const AuctionOption = ({ goodsDedail, chagerende, SelectGoodsLIst }) => {
  const [list] = goodsDedail;
  const [goodsTitle, setGoodsTitle1] = useState("");
  const [content, setContent] = useState({});
  const [goodsCategory, setGoodsCategory1] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [id, setId] = useState("");
  const [buyer, setBuyer] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const prevListRef = useRef();
  const prevBuyerRef = useRef();

  const chagePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const submit = async () => {
    await auctionPrice();
  };

  const auctionPrice = async () => {
    try {
      const rsp = await GoodsAxiosApi.goodsPrice(id, newPrice);
      if (rsp.data !== false) {
        chagerende();
        SelectGoodsLIst();
      } else {
        setModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const auctionPrice2 = async (e) => {
    try {
      const rsp = await GoodsAxiosApi.goodsPrice2(id, e);
      if (rsp.data !== false) {
        chagerende();
        SelectGoodsLIst();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBuyer = async () => {
    if (list && list.goodsStatus && typeof list.goodsStatus === 'string') {
      setGoodsTitle1(list.goodsTitle);
      setGoodsCategory1(list.goodsCategory);
      setId(list.goodsDetailId);

      const auction = list.goodsStatus;
      const splitted = auction.split('=');
      const extractedBuyer = splitted[1] ? splitted[1].trim() : '';
      await setBuyer(extractedBuyer);
      const currentDateTime = new Date();
      const auctionDateTime = new Date(list.auctionDate);
      setTimeOut(currentDateTime > auctionDateTime);
      if (!timeOut) {
        const timeDifference = auctionDateTime - currentDateTime;
        const timer = setTimeout(() => {
          cartAdd();
        }, timeDifference);
      }
    }
  };

  useEffect(() => {
    if (prevListRef.current !== list || prevBuyerRef.current !== buyer) {
      prevListRef.current = list;
      prevBuyerRef.current = buyer;
      updateBuyer();
    }

    setContent({
      goodsDetailId: list.goodsDetailId,
      title: list.goodsTitle,
      goodsImg: list.goodsPic,
      price: newPrice,
      quantity: 1,
    });

    if (timeOut) {
      console.log('현재 경매 종료 시간을 지났습니다.');
    }
  }, [list, buyer]);

  const cartAdd = async () => {
    try {
      console.log("장바구니에 담을 content 정보 : " + JSON.stringify(content));
      const res = await CartAxiosApi.addToCart2(content, buyer);
      if (res && res.status === 200) {
        console.log("장바구니에 물품을 담았습니다.");
        console.log(res.data);
        return res.data;
      } else {
        console.error("장바구니에 물품을 담는데 실패했습니다.", res);
      }
    } catch (error) {
      console.error("장바구니에 물품을 담는데 실패했습니다.", error);
    }
  };

  return (
    <GoodsOptionCss>
      <OptionCategory>{goodsCategory}</OptionCategory>
      <Seller>
        <Seller1>
          <Optionimage>
            {list.memberDto && <img src={list.memberDto.image} alt="{}"></img>}
          </Optionimage>
        </Seller1>
        <Seller2>
          <OptionNick>{list.memberDto && list.memberDto.nickName}</OptionNick>
          <OptionTitleEdit>{goodsTitle} </OptionTitleEdit>
        </Seller2>
      </Seller>

      <AuctionTime time={list.auctionDate} />

      <Participate >
        <div className="d1">
          현재 가 {list.goodsPrice}원
          <br />
        </div>
        <div className="d2">
          {timeOut ? null : <>
            <input type="number" value={newPrice} onChange={chagePrice} placeholder="입찰 희망가" />
            {list.goodsPrice > newPrice && newPrice !== "" && <>기존 가격보다 작습니다</>}</>
          }
        </div>

        {timeOut ? <>입찰이 종료되었습니다.</> : <><div className="d3">
          <AnotherButton value="입찰" onClick={submit} />
        </div>
        </>
        }
      </Participate>
      <AuctionModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={auctionPrice2}
        checkMmessage={'입력하시 금액보다 가격이 올랐습니다.'}
        setNewPrice={setNewPrice}
        newPrice={newPrice}
      >
      </AuctionModal>
    </GoodsOptionCss>
  );
};