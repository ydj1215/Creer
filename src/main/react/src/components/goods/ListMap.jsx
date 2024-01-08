import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { storage } from "../../api/FireBase";
import { Link } from "react-router-dom";


const ListMapCss = styled.div`
   width: 100%;
   height: auto;
   display: flex;
    justify-content: center;
    align-items: center; 
    margin-top: 20px;
`;


const List = styled.div`
height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      width: 100%;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: row;
   /* justify-content: center; */
   justify-content: start;
   list-style: none;
   padding: 0;
    li {
      width: 210px;
   height: auto;
   display: flex;
   flex-wrap: wrap;
   margin-left: 20px;
   padding: 10px;
      transition: box-shadow 0.3s ease-in-out;
      &:hover {
        box-shadow: 0px 0px 10px 0px rgb(252, 198, 198);
      }

      &:last-child:hover {
        box-shadow: none; /* 마지막 li에 대한 hover 효과 제거 */
      }

      @media (max-width: 768px) {
        width: 230px;
        margin: 0 auto;
        grid-area: option;
      }
    }
  }
`;
const Class1 = styled.div`

  padding: 0;
   margin: 0 auto;
   width: 200px;
   color: black;
   height: auto;
   .member{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin: 0;
   }

`;

const Class1img = styled.div`
   width: 200px;
   height: 200px;
   z-index: 1;
   img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
   }
   position: relative;
`;


const Class1Memberimg = styled.div`
  width: 30px;
   height: 30px;
img{
   border-radius: 50%;
   width: 30px;
   height: 30px;
}

`
const ClassPeice = styled.div`
  color: #2d2d2d;
   width: 100%;
   height: 30px;
   font-size: 1.4em;
   text-align: left;
`;

const ClassTitle = styled.div`
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px; /* 변경 가능한 높이 설정 */
    font-size: 1em;
`;

const ClassNick = styled.div`
   width: 100%;
   height: 20px;
   font-size: .8em;
   margin-left: 5px;
`;

const ClassCategory = styled.div`
  width: 50px;
   font-size: .6em;
   margin-left: 10px;
   border:  1px solid #b7b5b59a;
   text-align: center;
   margin-bottom: -30px;
   z-index: 2;
   position: relative;
   height: 15px;
   background-color:  #ffffff6c;
   border-radius: 10px;
   display: inline-block;
   max-width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;
export const ListMap = ({ list, status }) => {
  // 현재 시간을 가져옵니다.
  const currentDate = new Date();
  return (
    <ListMapCss>
      <List>
        <ul>
          {list &&
            list.map((item, index) => {
              const currentDate = new Date();
              if (item.goodsStatus !== 'sale' && currentDate >= new Date(item.auctionDate)) {
                return null;
              }

              return (
                <li key={index}>
                  {item.goodsStatus === 'sale' ? (
                    <Link className="" to={`/Goods/${item.goodsDetailId}`}>
                      <Class1>
                        <ClassCategory>{item.goodsCategory}</ClassCategory>
                        <Class1img>
                          <img src={item.goodsPic} alt={item.goodsPic} />
                        </Class1img>
                        <ClassTitle>{item.goodsTitle}</ClassTitle>
                        <ClassPeice>{item.goodsPrice}원</ClassPeice>
                        <div className="member">
                          <Class1Memberimg>
                            <img src={item.memberDto.image} alt={""} />
                          </Class1Memberimg>
                          <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                        </div>
                      </Class1>
                    </Link>
                  ) : (
                    <Link className="" to={`/Auction/${item.goodsDetailId}`}>
                      <Class1>
                        <ClassCategory>{item.goodsCategory}</ClassCategory>
                        <Class1img>
                          <img src={item.goodsPic} alt={item.goodsPic} />
                        </Class1img>
                        <ClassTitle>{item.goodsTitle}</ClassTitle>
                        <ClassPeice style={{ fontSize: "18px" }}>
                          {new Date(item.auctionDate).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </ClassPeice>
                        <div className="member">
                          <Class1Memberimg>
                            <img src={item.memberDto.image} alt={""} />
                          </Class1Memberimg>
                          <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                        </div>
                      </Class1>
                    </Link>
                  )}
                </li>
              );
            })
          }
        </ul>
      </List>
    </ListMapCss>
  );
}