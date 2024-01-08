import styled from "styled-components";
import { GoodsOption } from "../../components/goods/GoodsOption";
import { GoodsInfo } from "../../components/goods/GoodsInfo";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoodsInfoEdit } from "../../components/goods/GoodsInfoEdit";
import { GoodsOptionEdit } from "../../components/goods/GoodsOptionEdit";
import { AuctionOption } from "../../components/goods/AuctionOption";

const GoodsDetailCss = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90%;
  height: auto;
  margin-top: 100px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas:
      "option"
      "info";
  }
`;

export const AuctionDetail = () => {
  const { goodsId } = useParams();
  const [list, setList] = useState("");
  const [goodsCategory, setGoodsCategory] = useState("");
  const [goodsDeliveryFee, setGoodsDeliveryFee] = useState("");
  const [goodsDesc, setGoodsDesc] = useState("");
  const [goodsDetailId, setGoodsDetailId] = useState("");
  const [goodsPic, setGoodsPic] = useState("");
  const [goodsPrice, setGoodsPrice] = useState("");
  const [goodsStock, setGoodsStock] = useState("");
  const [goodsTitle, setGoodsTitle] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [memberDto, setMemberDto] = useState("");
  const [render, setrender] = useState(true);
  const nickName = localStorage.getItem("NickName");



  const chagerende = () => {
    setrender(prevRender => !prevRender);
  }
  // 상품 정보를 가져옵니다.
  useEffect(() => {
    //함수 만들기

    //함수 실행
    SelectGoodsLIst();
  }, [goodsId]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     SelectGoodsLIst();
  //     window.location.href = window.location.href; // 현재 페이지 URL로 이동하여 새로고침
  //   }, 30000); // 30초마다 실행

  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  // }, []);
  const SelectGoodsLIst = async () => {
    try {
      const rsp = await GoodsAxiosApi.getGoods(goodsId);
      // 상품 정보를 가져옵니다.
      console.log(rsp.data);
      //가져온 데이터를 저장
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };
  //가져온 상품 정보를 각각의 저장해 줍니다.
  useEffect(() => {
    if (list) {
      const {
        goodsCategory,
        goodsDeliveryFee,
        goodsDesc,
        goodsDetailId,
        goodsPic,
        goodsPrice,
        goodsStock,
        goodsTitle,
        auctionDate,
        memberDto,
      } = list;

      setGoodsCategory(goodsCategory);
      setGoodsDeliveryFee(goodsDeliveryFee);
      setGoodsDesc(goodsDesc);
      setGoodsDetailId(goodsDetailId);
      setGoodsPic(goodsPic);
      setGoodsPrice(goodsPrice);
      setGoodsStock(goodsStock);
      setGoodsTitle(goodsTitle);
      setAuctionDate(auctionDate);
      setMemberDto(memberDto);
    }
  }, [list]);



  //상품 기본키,상품 정보 ,상품사진
  const goodsInfoList = [
    goodsDetailId,
    goodsDesc,
    goodsPic,
    setGoodsDesc,
    setGoodsPic,
  ];
  const goodsOptionList = [
    list,
    setGoodsTitle,
    setGoodsPrice,
    setGoodsStock,
    setAuctionDate,
    setGoodsDeliveryFee,
    setGoodsCategory,
    setMemberDto,
  ];

  return (
    <GoodsDetailCss>
      <GoodsInfo
        list={goodsInfoList}
        reply={list.reviews}
        member={memberDto.nickName}
      ></GoodsInfo>
      <AuctionOption
        goodsDedail={goodsOptionList}
        chagerende={chagerende}
        SelectGoodsLIst={SelectGoodsLIst}
      ></AuctionOption>
    </GoodsDetailCss>
  );
};
