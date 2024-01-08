import { useEffect, useState } from "react";
import styled from "styled-components";
import { ListMap } from "../../components/goods/ListMap";
import { useNavigate } from "react-router-dom";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
const AuctionListCss = styled.div`
  width: 100%;
  height: auto;
  /* border: 5px solid #e9dd6f; */
`;



export const AuctionList = () => {
    const [list, setList] = useState([]);

    const goodsList = async () => {
        try {
            const res = await GoodsAxiosApi.AuctionList();
            setList(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        goodsList();
    }, []);


    return (
        <AuctionListCss>
            {/* 판매 리스트 출력 */}
            <ListMap list={list} status={"auction"}></ListMap>
        </AuctionListCss>
    )
}