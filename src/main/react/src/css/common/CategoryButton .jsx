import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Hover 효과용 Keyframes
const scale = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(.975);
  }
`;

const CategoryButtonCss = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
p{
  margin: 0;
  margin-top: 3px;
  font-size: .9em;
  height: auto;
}
`;
const BtnCss = styled.button`
  appearance: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: ${({ width }) => (width ? width : '50px')}; /* 수정된 동적 너비 설정 */
  height: ${({ height }) => (height ? height : '50px')}; /* 수정된 동적 높이 설정 */ 
  border-radius: 50%;
  /* background:  inset 0 0 20px 10px #0e0d0d; 수정된 box-shadow 값 */  
  background: ${({ logo }) => logo ? `url(${logo})` : 'logo'} center/cover;
  border: 1px solid rgb(134, 134, 134);
  box-shadow: ${({ shadow }) => shadow ? 'inset 0 0 12px 1px #ffa2acd9' : 'none'};
   /* 수정된 box-shadow 값 */
  transition: box-shadow 0.2s ease, transform 0.2s ease; /* 트랜지션 수정 */
  font-family: "Source Sans Pro", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #2e2e2e;
  /* text-shadow: 0 1px #f3f312; */
  &::-moz-focus-inner {
    border: 0;
  }

  &:hover:not([disabled]) {
    box-shadow: inset 0 0 20px 1px #97959579; /* 수정된 box-shadow 값 */
    transform: scale(0.975); /* 변형 효과 추가 */
    color: #858585;
    & > * {
      transform: scale(.975);
    }
  }

  &:focus:not(:active) {
    animation: ${scale} 0.9s alternate ; /* 수정된 애니메이션 속성 */
    outline: none;
  }

  &:active:not([disabled]) {
    box-shadow: inset 0 0 0 3px #686868; /* 수정된 box-shadow 값 */
    transform: scale(0.95); /* 변형 효과 추가 */

    & > * {
      transform: scale(0.95);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  background-size:80%;
  background-repeat:no-repeat;
`;


export const CategoryButton = ({ text, pick, submit, logo }) => {
  const [selectedCategory, setSelectedCategory] = useState(false);
  const click = () => {
    submit(text)
  }
  useEffect(() => {
    if (text === pick) {
      setSelectedCategory(true)
    } else {
      setSelectedCategory(false)
    }
  })
  return (
    <CategoryButtonCss>
      <BtnCss shadow={selectedCategory} onClick={click} logo={logo}>
      </BtnCss>
      <p>   {text}</p>
    </CategoryButtonCss>
  )
}