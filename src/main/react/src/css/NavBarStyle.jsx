import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Top = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 190px;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 40% 30% 30%;
  z-index: 10;
  grid-template-areas:
    "topL topC topR"
    "topL topC midR"
    "bottomL bottomC bottomR";
`;

export const TopR = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  grid-area: topR;
  display: flex;
  justify-content: end;
`;

export const TopL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  grid-area: topL;
  width: 100%;
  height: 100%;
`;

export const TopC = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  grid-area: topC;
`;

export const StyledLogo = styled(Logo)`
  width: 80%;
  height: 80px;
  margin-top: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const MidR = styled.div`
  position: relative;
  top: 75px;
  max-width: 35vw;
  display: flex;
  justify-content: end;
  font-size: 1rem;
  grid-area: midR;
  width: 100%;
  height: 100%;
  list-style: none;

  li {
    margin: 0 10px;
    white-space: nowrap; // 텍스트 한줄로 표시
    overflow: hidden;
    text-overflow: ellipsis; // 텍스트가 넘칠 때 ... 로 표시
    cursor: pointer;
  }

  span:hover {
    font-weight: bold;
  }
`;

export const MidRLogged = styled.div`
  position: relative;
  top: 15px;
  display: flex;
  justify-content: end;
  font-size: 1rem;
  grid-area: midR;
  height: 100%;
  list-style: none;
  width: 240px;
  li {
    margin: 0 10px;
    white-space: nowrap; // 텍스트 한줄로 표시
    overflow: hidden;
    text-overflow: ellipsis; // 텍스트가 넘칠 때 ... 로 표시
    cursor: pointer;
  }

  span:hover {
    font-weight: bold;
  }
`;

export const BottomC = styled.div`
  font-size: 1rem;
  grid-area: bottomC;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

// 드롭 다운
const MemberDropDownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 80%;
  right: 60%;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  }
`;

const GoodsDorpDownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 80%;
  right: 45%;
  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  }
`;
const AuctionDorpDownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 80%;
  right: 22.5%;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  }
`;
// 회원 드롭 다운
export const MemberDropDown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 클릭된 요소가 드롭다운 메뉴 내부가 아니라면 메뉴를 닫음
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // 전체 문서에 이벤트 리스너 등록
    document.addEventListener("mousedown", handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <MemberDropDownMenu ref={dropdownRef}>
      <li
        onClick={() => {
          navigate("/MyPage");
        }}
      >
        내 정보 관리
      </li>
      <li
        onClick={() => {
          navigate("/ChatList");
        }}
      >
        채팅
      </li>
      <li
        onClick={() => {
          navigate("/Member/Buyer");
        }}
      >
        구매 목록
      </li>
      <li
        onClick={() => {
          navigate("/Member/Seller");
        }}
      >
        판매 목록
      </li>
    </MemberDropDownMenu>
  );
};

// 상품 드롭 다운
export const GoodsDropDown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 클릭된 요소가 드롭다운 메뉴 내부가 아니라면 메뉴를 닫음
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // 전체 문서에 이벤트 리스너 등록
    document.addEventListener("mousedown", handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <GoodsDorpDownMenu ref={dropdownRef}>
      <li
        onClick={() => {
          navigate("/");
        }}
      >
        상품 보기
      </li>
      <li
        onClick={() => {
          navigate("/GoodsWrite");
        }}
      >
        상품 등록
      </li>
      <li
        onClick={() => {
          navigate("/Cart");
        }}
      >
        장바구니
      </li>
    </GoodsDorpDownMenu>
  );
};

// 경매 드롭 다운
export const AuctionDropDown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 클릭된 요소가 드롭다운 메뉴 내부가 아니라면 메뉴를 닫음
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // 전체 문서에 이벤트 리스너 등록
    document.addEventListener("mousedown", handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <AuctionDorpDownMenu ref={dropdownRef}>
      <li
        onClick={() => {
          navigate("/auction");
        }}
      >
        경매 보기
      </li>
      <li
        onClick={() => {
          navigate("/GoodsWrite");
        }}
      >
        경매 등록
      </li>
      <li
        onClick={() => {
          navigate("/Cart");
        }}
      >
        장바구니
      </li>
    </AuctionDorpDownMenu>
  );
};
