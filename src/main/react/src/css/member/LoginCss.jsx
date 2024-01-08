import styled, { css } from "styled-components";

export const Input = styled.input`
  margin: 0 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 1em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

export const Button = styled.button`
  margin: 0 30px ;
  font-weight: bold;
  width: 100%; /* 원하는 너비 설정 */
  height: 50px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: rgb(218, 70, 82);
  font-weight: 700;
  ${(props) =>
    props.enabled &&
    css`
      background-color: rgb(218, 70, 82);
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  height: auto;
  width: 100%;
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }
  .footer {
    display: flex;
    position: absolute;
    background-color: #ccc;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    color: #222;
    font-size: 0.8em;
    justify-content: center;
    align-items: center;
  }
`;

export const Items = styled.div`
  display: flex;
  align-items: center;

  &.sign {
    font-size: 30px;
    margin-top: 100px;
    margin-bottom: 40px;
    justify-content: center;
  }

  &.item1 {
    margin-top: 100px;
    margin-bottom: 0px;
    justify-content: center;
    height: 120px;
    img{
      height: 100%;
    }
  }
  &.item2 { 
    margin: 10px;
    height: 40px;
  }
  &.item3 {
    height: 40px;
    margin: 10px;
  }
  &.hint {
    margin-top: -5px;
    margin-bottom: 10px;
    margin-right: 40px;
    justify-content: right;
    font-size: 12px;
    color: #999;
  }

  &.signup {
    justify-content: right;
    color: rgb(218, 70, 82);
    font-weight: 700;
    margin-top: 10px;
    margin-right: 40px;

    font-size: 14px;
    .link_style {
      color: rgb(218, 70, 82);
      text-decoration-line: none;
    }
  }
`;
