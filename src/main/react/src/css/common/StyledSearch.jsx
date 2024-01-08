import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import { FaSearch } from "react-icons/fa";

// 검색바
const SearchBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  :hover {
    transform: scale(1.05);
  }
`;

const SearchMode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  height: 35px;
  margin: 20px;
  border: 1.5px solid #c9cacc;
  border-radius: 24px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: white; // 배경색을 흰색으로 설정

  @media (max-width: 768px) {
    height: 30px;
  }
`;

const Input = styled.input`
  width: 82%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  padding: 0 1vw; // 아이콘과 겹치지 않는 적절한 패딩을 설정
  background: rgba(0, 0, 0, 0);
  position: relative;

  &::placeholder {
    color: rgb(175, 175, 175);
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SearchIcon = styled.div`
  margin-left: -0.5vw;
  cursor: pointer;
  z-index: 1000;
  svg {
    color: #757575;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

export const StyledSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchTitle = async () => {
    navigate(`/` + search);
    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchTitle();
    }
  };

  return (
    <>
      <SearchBox>
        <SearchMode>
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <SearchIcon onClick={searchTitle}>
            <FaSearch />
          </SearchIcon>
        </SearchMode>
      </SearchBox>
    </>
  );
};
