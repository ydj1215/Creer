import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const GoodsAxiosApi = {
  // 상품 목록 전부 가져오기
  getGoodsList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/api/goods/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 내 상품 조회
  getMyGoods: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/Mylist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 경매 목록 조회
  AuctionList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/auction`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 경매 금액 변경
  goodsPrice: async (id, newPrice) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/goods/auctionPrice?id=${id}&price=${newPrice}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
  },
  goodsPrice2: async (id, newPrice) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/goods/auctionPrice2?id=${id}&price=${newPrice}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
  },



  // 상품 삭제
  deleteGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 추가
  insertGoods: async (content) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/goods/new/`, content, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 경매 추가
  insertAuction: async (content, auctionTime) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(

      KH_DOMAIN + `/api/goods/new/${auctionTime}`,
      content,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 상품 수정
  updateGoods: async (
    goodsCategory,
    goodsDeliveryFee,
    goodsDesc,
    goodsDetailId,
    goodsPic,
    goodsPrice,
    goodsStock,
    goodsTitle
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const goodsData = {
      goodsCategory,
      goodsDeliveryFee,
      goodsDesc,
      goodsDetailId,
      goodsPic,
      goodsPrice,
      goodsStock,
      goodsTitle,
    };

    return await axios.post(
      KH_DOMAIN + `/api/goods/update/${goodsDetailId}`,
      goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 상품 대표 이미지 넣기
  insertGoodsImg: async (num, newUrl) => {
    const accessToken = localStorage.getItem("accessToken");
    const goodsData = {
      goodsDetailId: num,
      goodsPic: newUrl,
    };
    return await axios.post(KH_DOMAIN + `/api/goods/new/picture/`, goodsData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 목록 한개 가져오기
  getGoods: async (id) => {
    return await axios.get(KH_DOMAIN + `/api/goods/list/${id}`);
  },

  // 카테고리 상품 검색
  categoryList: async (keyword) => {
    return await axios.get(
      KH_DOMAIN + `/api/goods/list/tag/?keyword=${keyword}`
    );
  },

  // 제목 상품 검색
  titleList: async (keyword) => {
    return await axios.get(
      KH_DOMAIN + `/api/goods/list/title/?keyword=${keyword}`
    );
  },

  // 상품 페이지 수 조회
  GoodsPage: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/api/goods/list/count?page=${page}&size=${size}`
    );
  },

  // 상품 페이지네이션 조회
  GoodsPageList: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/api/goods/list/page?page=${page}&size=${size}`
    );
  },
};
