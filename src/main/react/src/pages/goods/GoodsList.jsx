import { SlideOne } from "../../components/goods/SlideOne";
import { Category } from "../../components/goods/Category";
import { ListMap } from "../../components/goods/ListMap";
import styled from "styled-components";
import { Slide2 } from "../../components/home/Slide2";
import { useState } from "react";

const GoodsListCss = styled.div`
  width: 100%;
  height: auto;
  /* border: 5px solid #e9dd6f; */
`;

export const GoodsList = () => {
  const [list, setList] = useState([]);

  return (
    <GoodsListCss>
      {/* 이미지 슬라이드 */}
      <SlideOne />
      {/* <Slide2></Slide2>  */}
      {/* 판매 리스트 카테고리 */}
      <Category setList={setList} /> 
      {/* 판매 리스트 출력 */}
      <ListMap list={list} status={"sale"}></ListMap>
    </GoodsListCss>
  );
};
