import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryButton } from "../../css/common/CategoryButton ";
import { AnotherButton } from "../../css/common/AnotherButton";
import category from "../../images/category.png";
import category1 from "../../images/category1.png";
import category2 from "../../images/category2.png";
import category3 from "../../images/category3.png";
import category4 from "../../images/category4.png";
import category5 from "../../images/category5.png";
import category6 from "../../images/category6.png";
import category7 from "../../images/category7.png";
const ListItem = styled.li`
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.selected ? " #fde1e1" : "#dcdcdc")};
  /* color: ${(props) => (props.selected ? " #ffffff" : "#000000")}; */
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #ffeef0;
  }
`;

const CategoryCss = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 70px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 100%;
  }
`;
export const Category = ({ setList }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { title } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const CategoryClick = (e) => {
    setList([]);
    setCurrentPage(0);
    setSelectedCategory(e);
    navigate("/");
  };

  const titleList = async (title) => {
    try {
      const rsp = await GoodsAxiosApi.titleList(title);
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryList = async (category) => {
    try {
      const rsp = await GoodsAxiosApi.categoryList(category);
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goodsList = async () => {
    try {
      const res = await GoodsAxiosApi.GoodsPageList(currentPage, 5);
      const data = res.data;
      setList((prevList) => [...prevList, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
      ) {
        setCurrentPage(currentPage + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    if (title) {
      setSelectedCategory("검색");
      titleList(title);
    } else {
      if (selectedCategory === "전체") {
        setList([]);
        setCurrentPage(0);
      } else {
        categoryList(selectedCategory);
      }
    }
  }, [title, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "전체") {
      goodsList();
    }
  }, [currentPage]);

  return (
    <>
      <CategoryCss>
        <ul>
          <CategoryButton
            text={"전체"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category}
          >
          </CategoryButton>
          <CategoryButton
            text={"패션"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category3}
          >
          </CategoryButton>
          <CategoryButton
            text={"쥬얼리"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category2}
          >
            {" "}
          </CategoryButton>
          <CategoryButton
            text={"가구"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category1}
          >

          </CategoryButton>
          <CategoryButton
            text={"문구"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category4}
          >

          </CategoryButton>
          <CategoryButton
            text={"반려"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category5}
          >
            {" "}
          </CategoryButton>
          <CategoryButton
            text={"유아"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category7}
          >

          </CategoryButton>
          <CategoryButton
            text={"공예"}
            pick={selectedCategory}
            submit={CategoryClick}
            logo={category6}
          >
          </CategoryButton>
        </ul>
      </CategoryCss>
    </>
  );
};
