import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useParams } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { PopUpAddress } from "../../components/member/PopUpAddress";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";
import { ClickPay } from "../../components/goods/ClickPay";

const PaymentCss = styled.div`
  width: 80%;
  height: auto;

  margin: 0 auto;
  margin-top: 50px;
  div {
    /* border: 1px solid black; */
    margin: 10px 0;
  }
  .content1 {
    width: 100%;
    height: auto;
    border-bottom: 2px solid #7f7f7f;
    h2 {
      margin: 0;
    }
  }
  .content2 {
    width: 100%;
    height: auto;
    .content2-1 {
      border-bottom: 2px solid #a9a9a9;
      width: 100%;
      height: auto;
      margin-top: 50px;
      h3 {
        margin: 0;
      }
    }
    .content2-2 {
      margin: 0 auto;
      width: 80%;
      height: 100px;
      ul {
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        .z1 {
          height: 80px;
          width: 100%;

          .title {
            height: 80px;
          }
          .content {
            width: 100%;

            height: 80px;
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;

            .add {
              width: auto;
              height: 30px;
              margin: 0;
            }
            .add2 {
              display: flex;
              flex-direction: row;
              width: 120px;
              height: 30px;
              margin: 0;
              margin-top: -10px;
            }
            .add3 {
              width: 120px;
              margin-left: 10px;
              margin-top: 15px;
              button {
                margin: 0;
                padding: 0;
              }
            }
          }
        }
        li:first-child {
          border-top: 1px solid #4d4949;
        }
        li:last-child {
          border-bottom: 1px solid #4d4949;
        }

        li {
          border-bottom: 1px solid #a9a9a9;
          display: flex;
          flex-direction: row;
          height: auto;
          .add {
            height: 10px;
            margin: 0;
            margin-top: -26px;
            padding: 0;
            width: 150px;
          }
          .title {
            border-right: 1px solid #a9a9a9;
            margin: 0;
            width: 150px;
            height: 35px;
            background: #d7d7d7;
            font-size: 0.8em;
            display: flex;
            justify-content: right;
            padding-right: 10px;
            align-items: center;
          }

          .content {
            margin: 0;
            margin-left: 10px;
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            button {
              margin-top: 5px;
              margin-left: 15px;
            }
          }
        }
      }
    }
  }
  .content3 {
    margin: 20px auto;
    width: 80%;
    height: auto;
    border: 2px solid #9d9d9d;
    display: flex;
    flex-direction: row;
    align-items: center;
    .content3-1 {
      width: 150px;
      height: auto;
      margin: 0;
      padding: 0;

      img {
        width: 120px;
        height: 120px;
      }
    }
    .content3-2 {
      width: 100%;
      margin: 0;
      padding: 0;
      height: auto;
      display: flex;
    }

    .content3-2 .title {
      flex: 1;
      padding: 10px;
    }
    .content3-2 > div:not(.title) {
      width: 80px;
      padding: 10px;
      border-left: 2px solid #7e7e7e;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content4 {
    width: 500px;
    height: auto;
    margin: 0 auto;
    margin-top: 150px;
    padding-bottom: 60px;
    display: flex;
    button {
      margin: 0 auto;
    }
  }
`;

export const Payment = () => {
  const navigate = useNavigate();
  const { goodsId } = useParams();
  const [list, setList] = useState("");

  const [content, setContent] = useState({
    receiveAdd: "",
    receiveName: "",
    receiveNumber: "",
    requirements: "",
  });
  const [name, setName] = useState("");
  const [newName, setnewName] = useState("");
  const [onName, setOnName] = useState(false);

  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [onPhone, setonPhone] = useState(false);

  const [add, setAdd] = useState("");
  const [onAdd, setOntAdd] = useState(false);
  const [inputAdd, setInputAdd] = useState("");
  const [inputAdd2, setInputAdd2] = useState("");
  const [inputAdd3, setInputAdd3] = useState("");
  const [price, setPrice] = useState("");
  const [require, setRequire] = useState("");
  const [newRepuie, setNewRepuie] = useState("");
  const [onRepuie, setOnRepuie] = useState(false);
  useEffect(() => {
    const select = async () => {
      try {
        const res = await CartAxiosApi.selectCart(goodsId);
        if (res && res.status === 200) {
          console.log("장바구니 추가" + res.data);
          setList(res.data);
        } else {
        }
      } catch (error) {
        // 오류가 발생한 경우
        console.error("장바구니 추가 에러", error);
      }
    };
    select();
  }, []);
  useEffect(() => {

    if (list) {
      setName(list.buyer.name);
      setAdd(list.buyer.address);
      setPhone(list.buyer.phoneNum);
      setPrice(list.price * list.quantity)
    }
  }, [list]);

  const cancel = () => {
    navigate(-1);
  };

  const nemeInput = () => {
    setOnName((prevState) => !prevState);
    setName("");
    if (onName === true) {
      setName(newName);
    }
  };
  const chageName = (e) => {
    setnewName(e.target.value);
  };

  const chageAdd = (e) => {
    setOntAdd(!onAdd);
    setAdd(inputAdd + "/" + inputAdd2 + "/" + inputAdd3);
    console.log(inputAdd2);
  };
  const chageAdd2 = (e) => {
    setInputAdd3(e.target.value);
  };

  const phoneInput = () => {
    setonPhone((prevState) => !prevState);
    setPhone("");
    if (onPhone === true) {
      setPhone(newPhone);
    }
  };
  const chagePhone = (e) => {
    setNewPhone(e.target.value);
  };

  const requireInput = () => {
    setOnRepuie((prevState) => !prevState);
    setRequire("");
    if (onRepuie === true) {
      setRequire(newRepuie);
    }
  };
  const chageRequire = (e) => {
    setNewRepuie(e.target.value);
  };

  const addPurchase = async () => {
    try {
      console.log("구매 content 정보 : " + JSON.stringify(content));
      const rsp = await PurchaseAxiosApi.insertPurchase(
        content,
        list.goodsDetailId
      );
      console.log("구매한 상품 상세정보 : " + rsp.data);
    } catch (error) {
      console.error("상품 구매 오류 발생 : " + error);
    }
  };
  useEffect(() => {
    if (list) {
      const updatedReceiveAdd = onAdd
        ? `${inputAdd}/${inputAdd2}/${inputAdd3}`
        : add;
      setContent((prevContent) => ({
        ...prevContent,
        requirements: newRepuie,
        receiveName: onName ? newName : list.buyer.name,
        receiveAdd: updatedReceiveAdd,
        receiveNumber: onPhone ? newPhone : list.buyer.phoneNum,
      }));
      // 다른 작업 수행
    }

    // 다른 경우에 대한 작업
  }, [
    list,
    onAdd,
    inputAdd,
    inputAdd2,
    inputAdd3,
    add,
    newRepuie,
    onName,
    newName,
    onPhone,
    newPhone,
  ]);

  useEffect(() => {
    setContent({
      option: list.option,
      quantity: list.quantity,
      requirements: newRepuie,
      receiveName: newName,
      receiveAdd: inputAdd,
      receiveNumber: newPhone,
    });
    // 다른 작업 수행
  }, [list, newRepuie, newName, inputAdd, newPhone]);
  const cansel = async () => {
    try {
      const response = await CartAxiosApi.removeFromCart(list.cartId);
      if (response.status === 200) {
        console.error("장바구니 삭제 성공");
      } else {
        console.error("장바구니 삭제 실패");
      }
    } catch (error) {
      console.error("에러 확인:", error);
    }
    navigate(-1);
  };

  return (
    <PaymentCss>
      <div className="content1">
        <h2>주문 결제</h2>{" "}
      </div>

      <div className="content3">
        <div className="content3-1">
          {list && <img src={list.goodsImg} alt=""></img>}
        </div>
        <div className="content3-2">
          <div className="title">{list && list.title}</div>
          <div>{list && list.price}원</div>
          <div>{list && list.quantity}개</div>
          <div>{price}원</div>
        </div>
      </div>
      <div className="content2">
        <div className="content2-1">
          <h3>구매자</h3>
        </div>
        <div className="content2-2">
          <ul>
            <li>
              <div className="title">이름</div>
              <div className="content">{list && list.buyer.name}</div>
            </li>
            <li>
              <div className="title">이메일</div>
              <div className="content">{list && list.buyer.email}</div>
            </li>
            <li>
              <div className="title">전화 번호</div>
              <div className="content">{list && list.buyer.phoneNum}</div>
            </li>
          </ul>
        </div>
        <div className="content2-1">
          <h3>받는사람</h3>
        </div>
        <div className="content2-2">
          <ul>
            <li>
              <div className="title">이름</div>
              <div className="content">
                {name}
                {onName && (
                  <input
                    type="text"
                    onChange={chageName}
                    value={newName}
                  ></input>
                )}
                <AnotherButton
                  width={"70px"}
                  height={"20px"}
                  value={"변경"}
                  onClick={nemeInput}
                ></AnotherButton>
              </div>
            </li>
            <li className="z1">
              <div className="title">배송주소 </div>
              <div className="content">
                {onAdd !== true ? (
                  <>
                    <div className="add">{add}</div>
                    <div className="add2">
                      <AnotherButton
                        width={"70px"}
                        height={"20px"}
                        value={"변경"}
                        onClick={chageAdd}
                      ></AnotherButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="add">
                      {inputAdd}
                      {inputAdd2}
                      {inputAdd2 === "" ? (
                        <> </>
                      ) : (
                        <input
                          type="text"
                          placeholder="상세주소"
                          onChange={chageAdd2}
                          value={inputAdd3}
                        ></input>
                      )}{" "}
                    </div>
                    <div className="add3">
                      <PopUpAddress
                        setInputAdd={setInputAdd}
                        setInputAdd2={setInputAdd2}
                        height={"10"}
                      ></PopUpAddress>
                    </div>
                    <div className="add4">
                      <AnotherButton
                        width={"70px"}
                        height={"20px"}
                        value={"확인"}
                        onClick={chageAdd}
                      ></AnotherButton>
                    </div>
                  </>
                )}
              </div>
            </li>
            <li className="z2">
              <div className="title">연락처</div>
              <div className="content">
                {phone}
                {onPhone && (
                  <input
                    type="text"
                    onChange={chagePhone}
                    value={newPhone}
                  ></input>
                )}
                <AnotherButton
                  width={"70px"}
                  height={"20px"}
                  value={"변경"}
                  onClick={phoneInput}
                ></AnotherButton>
              </div>
            </li>
            <li>
              <div className="title">배송 요청사항</div>
              <div className="content">
                {require}
                {onRepuie && (
                  <input
                    type="text"
                    onChange={chageRequire}
                    value={newRepuie}
                  ></input>
                )}
                <AnotherButton
                  width={"70px"}
                  height={"20px"}
                  value={"추가"}
                  onClick={requireInput}
                ></AnotherButton>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="content4">
        <ClickPay price={price} content={content} addPurchase={addPurchase} />
        <AnotherButton value={"취소"} onClick={cansel}></AnotherButton>
      </div>
    </PaymentCss>
  );
};
