import styled from 'styled-components';



export const Container = styled.div`
  width:40vw;
  height: auto;
 
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

 margin: 150px auto;
 & .login {
  
    margin: 0 auto;
 
    font: normal normal bold 24px/35px Poppins;
    letter-spacing: 0px;
    color:black;
    opacity: 1;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }

`;
export const Hint = styled.div`
width: 60%;
height: 100%;
text-align:right;
  margin-top: 5px;

   
   
    font-size: 14px;


  
`;
export const Items = styled.div`


   margin-bottom: 30px;
  &.item1 {
    width: 400px;
    height:100px;
 
    img{
       
        width: 100%;
       
    }
 
  }
  &.item2 {
    width: 60%;
    margin: 8px auto;
    
  
  }
  &.item3 {
    width:50%;
    margin-top: 10px;

    justify-content: center;
    color: red;
    font-size: 14px;
    display: flex;
    
  }
  &.hint {
  
    
  }
    

  &.signup{
    justify-content: right;
    font-weight: 700px;
    font-size: 14px;   
    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
  }
  &.signin{
    justify-content: right; 
    font-weight: 700px;
    margin-right: 40px;
    font-size: 14px;
    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
}
`;

export const Input = styled.input`
  
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 12px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

export const Button = styled.button`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: bold;
  width: 60%; /* 원하는 너비 설정 */
  height: 38px;
  color: white;
  background-color: #f4ce14;
  font-size: 15px;
  font-weight: 400;
  border-radius: 12px;
  font-weight: 700;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: red;
  }
`;