import styled from "styled-components";

import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoodsInfoEdit } from "../../components/goods/GoodsInfoEdit";
import { GoodsOptionEdit } from "../../components/goods/GoodsOptionEdit";


const GoodsDetailCss = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
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

export const GoodsEdit = () => {
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
  const [memberDto, setMemberDto] = useState("");
  const nickName = localStorage.getItem("NickName");

  // 상품 정보를 가져옵니다.
  useEffect(() => {
    //함수 만들기
    const SelectGoodsLIst = async () => {
      try {
        const rsp = await GoodsAxiosApi.getGoods(goodsId);
        // 상품 정보를 가져옵니다.
        console.log("상품 상세정보");
        console.log(rsp.data);
        //가져온 데이터를 저장
        setList(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    //함수 실행
    SelectGoodsLIst();
  }, [goodsId]);
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
        memberDto,
      } = list;

      setGoodsCategory(goodsCategory);
      setGoodsDeliveryFee(goodsDeliveryFee);
      setGoodsDesc(goodsDesc);
      setGoodsDetailId(goodsDetailId);
      setGoodsPic(goodsPic);
      setGoodsPrice(goodsPrice);
      setGoodsStock(goodsStock);
      setGoodsStock(goodsStock);
      setGoodsTitle(goodsTitle);
      setMemberDto(memberDto);
    }
  }, [list]);

  const updateGoodsDetail = () => {

    //게시글 수정 기능을 만듬
    const updateGoods = async () => {
      try {
        const update = await GoodsAxiosApi.updateGoods(
          goodsCategory,
          goodsDeliveryFee,
          goodsDesc,
          goodsDetailId,
          goodsPic,
          goodsPrice,
          goodsStock,
          goodsTitle
        );
      } catch (error) {
        console.log(error);
      }
    };
    //게시글 수정 기능을 실행
    updateGoods();
  };

  //정보 컴포넌트로 보내줄 데이터
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
    setGoodsDeliveryFee,
    setGoodsCategory,
    setMemberDto,
  ];

  return (
    <GoodsDetailCss>
      {/* 작성자와 로그인 회원이 다를 경우 */}
      <GoodsInfoEdit
        list={goodsInfoList}
        reply={list.reviews}
        member={memberDto.nickName}
      ></GoodsInfoEdit>
      <GoodsOptionEdit
        goodsDedail={goodsOptionList}
        updateGoodsDetail={updateGoodsDetail}
      ></GoodsOptionEdit>
    </GoodsDetailCss>
  );
};
