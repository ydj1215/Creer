import { storage } from "../../api/FireBase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import styled from "styled-components";
import { PictureAxiosApi } from "../../api/goods/PictureAxiosApi";
import { QuillText } from "../../components/goods/QuillText";
import { OptionWriteBox } from "../../components/goods/OptionWriteBox";
import { AnotherButton } from "../../css/common/AnotherButton";
import { OptionAxiosApi } from "../../api/goods/OptionAxiosApi";
import { TimeModal } from "../../utils/goods/TimeModal";


const GoodsWriteCss = styled.div`
  display: grid;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 100px;
  grid-template-columns: 65% 35% ;
     grid-template-rows: auto 100%; 
        grid-template-areas:  
        'L1 R1 '
        'L1 R2';  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    grid-template-areas:  
        'R1 '
        'L1 '
        'R2 ';  
  }
`;
const GoodsInfoCss = styled.div`
    width: 100%;
    height: auto;
    grid-area: L1;
 
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;  
    }
   
`;

const ImgCategory = styled.div`
  width: 95%;
  height: auto;
  display: flex;
   flex-direction: column;
  .ImgCategory1{
    width: 100%;   
    height: 470px;
  }
  .ImgCategory2{
    width: 100%;
    height: 120px;

    display: flex;
  flex-direction: row;
  justify-content: center;

    img{
      margin: 5px;
      border: 1px solid black;
      width: 120px;
    height: 120px;
    padding: 10px;
    }
  }
`
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
   border: ${(props) => (props.url === null || props.url.length === 0 ? '3px solid red' : '3px solid  #03bf81')};
   .mainImg{ 
        width: 450px;   
        height: auto;
        display: flex;
        justify-content: center;
        img{
          border: 1px solid rgba(171, 171, 171, 0.5);
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`     
       width: 80%;
    height: auto;
border: ${(props) => (props.goodsDesc === null || props.goodsDesc.length == 0 ? '3px solid red' : '3px solid  #03bf81')};
    margin: 20px auto;    
    input{
     width: 90%;  
    }
`;
const InfoCategory = styled.div`
 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;

ul{   margin: 0;
 padding: 0;
  display: flex;
    li{   margin: 0;
 padding: 0;
     width: 150px;
     margin: 0 10%;
     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
const NewImgBox = styled.div`
width: 100%;
height: auto;
text-align: center;
margin-top: 50px;
img{
  border: 1px solid black;
  padding: 10px;
  width: 150px;
  height: 150px;
}
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  color: white;
  background-color: #e5e5e5;
  border: 1px solid  #484848;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #6f6f6f;
  }
`;

const GoodsOptionCss = styled.div`
    width: 100%;
    height: auto;
      grid-area: R1;
  
    @media (max-width: 768px) {
      width: 500px;
      margin: 0 auto;

    }


`;


const Seller = styled.div`
position: relative;
width: 100%;
height: 150px;
    display: flex;
border-bottom: 1px solid rgba(136, 136, 136, 0.673);
    /* justify-content: center; */
   align-items: center;
margin-top: 20px;  
`;

const Seller1 = styled.div`

width: 100px;
   height: 100px;
    display: flex;
    /* justify-content: center; */
   align-items: center;
   img{
    width: 100px;
   height: 100px;
   }
 
`;

const Seller2 = styled.div`

  width:100%;
    display: flex;
    position: relative; 
    flex-direction: column;
    /* justify-content: center; */
   align-items: center;
   padding: 10px;

`;

const OptionNick = styled.div`
width: 100px;
  position: absolute;
    padding: 10px;
  left: 0;
  top: -25px;
`;
const OptionCategory = styled.div`

width: 100%;
height: auto;
border: ${(props) => (props.goodsCategory === null || props.goodsCategory.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
.CategoryRaido{
 display: none;
}
&:hover  .CategoryRaido{
  display: block;
}
`;

const OptionTitleEdit = styled.input`
font-size: 1.5em;
line-height: 1.2em;
padding-bottom: 20px;
 width:100%; 
 height: auto;
border: ${(props) => (props.goodsTitle === null || props.goodsTitle.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
const Delivery = styled.div`
width: 100%;
position:relative;

 height: auto;
`;
const OptionPrice = styled.input`
position: relative;
margin-top: 20px;
right:0;
font-size: 1.5em;
margin-right: 100px;
width: 100%;
height: 30px;
border: ${(props) => (props.goodsPrice === null || props.goodsPrice.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
const GoodsDeliveryFee = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsDeliveryFee === null || props.goodsDeliveryFee.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;

const GoodsRefund = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsRefund === null || props.goodsRefund.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;
const Option2 = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
@media (max-width: 768px) {
        width: 500px;
      margin: 0 auto;
      grid-area: R2;
      padding-bottom: 10px;
    }
`


const Option = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: center;
.option1 {
  width: 100%;
    height: auto;
    margin-top: 30px;
}
`;

const TypeCss = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: row;
justify-content:space-around;
margin-bottom: 20px;
`;

export const GoodsWrite = () => {
  const navigate = useNavigate();
  const [goodsCategory, setGoodsCategory] = useState('');
  const [goodsDeliveryFee, setGoodsDeliveryFee] = useState("");
  const [goodsDesc, setGoodsDesc] = useState("");
  const [goodsPic, setGoodsPic] = useState("");
  const [goodsPrice, setGoodsPrice] = useState("");
  const [goodsStock, setGoodsStock] = useState("");
  const [goodsTitle, setGoodsTitle] = useState("");
  const [goodsStatus, setGoodsStatus] = useState("sale");
  const [content2, setContent2] = useState([]);
  const [content, setContent] = useState({});
  const [type, setType] = useState('goods');
  const [auctionDate, setAuctionDate] = useState('null');
  const nickName = localStorage.getItem("NickName");
  const UserImg = localStorage.getItem("UserImg");

  //상품 대표 이미지
  const [url, setUrl] = useState('');
  //상품 대표 이미지 변경시 사용
  const [mainUrl, setMainUrl] = useState("");
  //상품 대표 이미지 변경시 사용
  const [subUrl, setSubUrl] = useState([]);
  // 상품 정보를 가져옵니다.
  const [modaOpen, setModaOpen] = useState(false);
  useEffect(() => {

  }, [subUrl]);



  const goodsSubmit = () => {
    insert('Goods')
  }
  const auctionSubmit = () => {
    insert('Auction')
  }




  useEffect(() => {

    setContent({
      goodsCategory,      // 카테고리
      goodsPic,        // 상품 사진    ,
      goodsDesc,        // 상품 설명
      goodsStock,      // 재고
      goodsTitle,        // 상품 이름      
      goodsPrice,        // 상품 가격
      goodsDeliveryFee,  // 배달비
      goodsStatus,  // 판매 상태    

    })
  }, [goodsCategory, goodsPic, goodsDesc, goodsStock, goodsTitle, goodsPrice, goodsStatus])

  const insert = async (e) => {
    //대표 이미지 추가
    try {
      const response = await GoodsAxiosApi.insertAuction(content, auctionDate);
      //작성한 글의 PK를 가져옴
      const num = response.data;
      // 새로운 속성을 추가한 새로운 배열
      const updatedArray = content2.map(item => {
        return {
          ...item, // 기존의 객체 속성을 그대로 유지하면서
          goodsDetailId: num  // 새로운 속성을 추가합니다.
        };
      });

      if (response.status === 200) {
        const response3 = await OptionAxiosApi.insertOption(num, updatedArray);
        for (let i = 0; i < subUrl.length; i++) {
          //받은 PK에 사진을 저장
          const response2 = await PictureAxiosApi.insertGoodsImg(num, subUrl[i]);
        }
      }
      navigate(`/${e}/` + num)
    }
    catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
      console.log(error)
    }

  }



  //파이어베이스 이미지 주소 받기
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      setUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const MainImgChange = () => {
    setMainUrl(url)
    setGoodsPic(url)
    setUrl('')

  }
  const subImgAdd = () => {
    setSubUrl(prevState => [...prevState, url]);
    console.log(subUrl)
  }
  const deleteImg = (index) => {
    const updatedSubUrl = subUrl.filter((_, i) => i !== index);
    setSubUrl(updatedSubUrl);
  }
  const timeModalOpen = () => {
    setModaOpen(true)
  }
  return (
    <GoodsWriteCss>
      <GoodsInfoCss>
        <ImgCategory>
          <div className="ImgCategory1">
            <ImgBox url={mainUrl}>
              <div className="mainImg" >
                <img src={mainUrl} alt="대표 이미지" />
              </div>
            </ImgBox>
          </div>
          <div className="ImgCategory2">
            {subUrl && subUrl.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index}`} onClick={() => { deleteImg(index) }} />
            ))}
          </div>
          <NewImgBox>
            <img src={url} alt="새 이미지" />
          </NewImgBox>
          <UploadContainer>
            <UploadLabel>
              파일 선택
              <UploadInput type="file" onChange={handleFileUpload} />
            </UploadLabel>
            <UploadLabel>
              대표 이미지로 저장
              <UploadInput type="button" onClick={MainImgChange} />
            </UploadLabel>
            <UploadLabel>
              상품 이미지로 저장
              <UploadInput type="button" onClick={subImgAdd} />
            </UploadLabel>
          </UploadContainer>
        </ImgCategory>
        <InfoCategory>
          <ul>
            <li>소개</li>
            <li>댓글</li>
            <li>판매자</li>
          </ul>
        </InfoCategory>
        <InfoBox goodsDesc={goodsDesc}>
          {/* 상품 정보 표시 */}
          <QuillText goodsDesc={goodsDesc} setGoodsDesc={setGoodsDesc}>
          </QuillText>
        </InfoBox>
      </GoodsInfoCss>
      <GoodsOptionCss>
        <TypeCss>
          <AnotherButton value={"상품"} onClick={() => { setType('goods'); timeModalOpen(); setGoodsStatus('sale') }}></AnotherButton>
          <AnotherButton value={"경매"} onClick={() => { setType("auction"); setGoodsStatus('auction') }}></AnotherButton>
        </TypeCss>
        <OptionCategory goodsCategory={goodsCategory} >  {goodsCategory ? goodsCategory : "카테고리"}
          <div className="CategoryRaido">
            <input type="radio" name="goods" id="패션" value="패션" onChange={(e) => { setGoodsCategory(e.target.value) }} />패션
            <br />
            <input type="radio" name="goods" id="쥬얼리" value="쥬얼리" onChange={(e) => { setGoodsCategory(e.target.value) }} />쥬얼리
            <br />
            <input type="radio" name="goods" id="가구" value="가구" onChange={(e) => { setGoodsCategory(e.target.value) }} />가구
            <br />
            <input type="radio" name="goods" id="문구" value="문구" onChange={(e) => { setGoodsCategory(e.target.value) }} />문구
            <br />
            <input type="radio" name="goods" id="반려" value="반려" onChange={(e) => { setGoodsCategory(e.target.value) }} />반려
            <br />
            <input type="radio" name="goods" id="아동" value="아동" onChange={(e) => { setGoodsCategory(e.target.value) }} />아동
            <br />
            <input type="radio" name="goods" id="공예" value="공예" onChange={(e) => { setGoodsCategory(e.target.value) }} />공예
            <br />
          </div>
        </OptionCategory>
        <Seller>
          <Seller1>
            <img src={UserImg} alt=""></img>
          </Seller1>
          <Seller2>
            <OptionNick>{nickName && nickName}</OptionNick>
            <OptionTitleEdit goodsTitle={goodsTitle} type="text" value={goodsTitle} onChange={(e) => { setGoodsTitle(e.target.value) }} placeholder="제목 :" />
          </Seller2>
        </Seller>
        <Delivery>
          <OptionPrice goodsPrice={goodsPrice} type="text" value={goodsPrice} onChange={(e) => { setGoodsPrice(e.target.value) }} placeholder=" 가격 :" />
          <GoodsDeliveryFee goodsDeliveryFee={goodsDeliveryFee} type="text" value={goodsDeliveryFee} onChange={(e) => { setGoodsDeliveryFee(e.target.value) }} placeholder=" 배송비 :" />
          {type === 'goods' &&
            <GoodsRefund goodsRefund={goodsStock} type="text" value={goodsStock} onChange={(e) => { setGoodsStock(e.target.value) }} placeholder=" 재고 :" />
          }
        </Delivery>
        <Option>
          <div className="option1">
            <OptionWriteBox setContent2={setContent2}></OptionWriteBox>
          </div>
          <div className="option1">
            {type === 'auction' &&
              <TimeModal modaOpen={modaOpen} setAuctionDate={setAuctionDate}></TimeModal>
            }
          </div>
        </Option>
      </GoodsOptionCss>
      <Option2>
        {
          (goodsCategory !== null &&
            goodsPic !== null &&
            goodsDesc !== null &&
            // goodsStock !== null &&
            goodsTitle !== null &&
            goodsPrice !== null &&
            goodsDeliveryFee !== null &&
            goodsCategory.length !== 0 &&
            goodsPic.length !== 0 &&
            goodsDesc.length !== 0 &&
            // goodsStock.length !== 0 &&
            goodsTitle.length !== 0 &&
            goodsPrice.length !== 0 &&
            goodsDeliveryFee.length !== 0) ? <> {
              type !== 'auction' ?
                <>  <AnotherButton value={" 상품 작성 완료"} onClick={goodsSubmit}></AnotherButton></>
                :
                <> <AnotherButton value={"경매 작성 완료"} onClick={auctionSubmit}></AnotherButton></>
            }
          </> : <>
          </>
        }
      </Option2>
    </GoodsWriteCss>
  )
}



