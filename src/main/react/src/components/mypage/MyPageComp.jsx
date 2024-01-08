import styled from "styled-components";

export const Body = styled.div`
  background-color: rgba(245, 245, 245, 0.9);
  width: 100%;
`;

// 기본 컨테이너: 전체 레이어
export const Container = styled.div.attrs({
  className: "MyPageContanier-container",
})`
  width: 100%;
  height: auto;
  display: flex;
  background: white;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

//
// 좌측 레이어, 모바일은 전체
// 좌측(이미지 및 정보보여주기, 정보 출력)
export const Left = styled.div`
  display: flex;
  width: 45%;
  /* box-shadow: 0 0 20px rgba(33, 33, 33, 0.2); */
  flex-direction: column;
  align-items: center;
  min-width: 450px;
  background: white;
  padding-bottom:10px ;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    color: black;
  }
`;

//
// 이미지 변경 및 등록 레이어
export const Imagine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 450px;
  @media (max-width: 768px) {
    width: 60%;
    height: 30%;

  }
`;
export const Img = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 250px;
  height:250px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

// 이미지 나누기 구역
export const ImageSection = styled.div`
  display: flex;
  white-space: nowrap;
  width: 60%;
  @media (max-width: 768px) {
    height: auto;

  }
`;

// 이미지 등록
export const ImageSubmit = styled.input`
  cursor: pointer;
  outline: none;
`;

// 이미지 업로드
export const ImageUpload = styled.button`
  color: black;
  cursor: pointer;
  outline: none;
`;

// 정보 레이어
export const InfoBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  border: 3px solid gray;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;  padding-bottom: 20px;
  @media (max-width: 768px) {
    width: 50%;
    height: auto;
    margin-bottom: 20px;   margin-top: 20px;

  }
`;

export const LeftDiv = styled.div`
   display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: auto;
    button{
      height: 50px;
      margin: 5px 0;
    }
  }
`;

//
// 우측 레이어, 모바일시 어퍼 레이어
// 우측 실제로 정보를 변경하는 레이어
export const Right = styled.div`
  color: black;
  width: 45%;
  height: 100%;
  display: flex;
  background-color: rgba(245, 245, 245, 0.9);
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.isVisible ? "true" : "none")};
    position: absolute;
  }
`;

// 정보 수정창
export const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  animation-name: Info-animation;
  animation-duration: 0.3s;
  width: 80%;
  height: 450px;
  @media (max-width: 768px) {
    justify-content: center;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 300px;
    background-color: #fff;
    z-index: 3000;
    position: fixed;
  }

  @keyframes Info-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// 정보 수정창 등장
export const InputTag = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  border-radius: 10px;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "80%"};
  @media (max-width: 768px) {
    z-index: 100;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40vh;
    opacity: 1;
    border: none;
  }
`;

export const InpuTitle = styled.div`
  display: flex;
  width: 70%;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

// 입력창
export const InputBox = styled.input`
  border: none;
  text-align: center;
  border-radius: 10px;
  width: 60%;
  height: 30px;
  font-size: 1rem;

  @media (max-width: 768px) {
    border: 2px solid gray;
    background-color: none;
    width: ${(props) => props.width || "60%"};
    height: ${(props) => props.height || "100%"};
    font-size: 1rem;
  }
`;

// 우측 하단 버튼들의 레이어
export const RightButton = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  button{
    height: 50px;
  }
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    display: ${(props) => (props.isvisible ? "flex" : "none")};
    z-index: 50;
  }
`;

// 체크
export const DivRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 3px solid grey;
  width: 80%;
`;
export const DivRowt = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 3px solid grey;
  width: 80%;
`;

export const SetButton = styled.button`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || "20%"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  border: 2px solid #888888;
  outline: none;
  background-color: white;
  color: black;
  border-radius: 10px;
  transition: 0.13s ease-in-out;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

export const MyPageButton = styled.button`
  width: 80px;
  height: 40px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  border: 2px solid #888888;
  outline: none;
  color: black;
  background-color: white;
  cursor: pointer;
`;

export const Information = styled.p`
  @media (max-width: 768px) {

  }
`;

export const CashTag = styled.div`
  height: 100%;
  width: 100%;
`;

export const Bank = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
`;

export const BankButton = styled.button`
  width: 30%;
  height: 80%;
  outline: none;
  border: 1px solid white;
  border-radius: 10px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const CashCharge = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    position: absolute;
    color:black;
    margin-left: 92%;
    margin-top: -85%;
    width: 7%;
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 2px solid #888888;
    outline: none;
    border-radius: 20%;
    background-color: white;
    transition: 0.13s ease-in-out;
    cursor: pointer;
    z-index: 4000;
  }
`;
