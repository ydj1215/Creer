import { useState } from "react";
import styled, { css } from "styled-components";

const Test2Css = styled.div`   
display:  grid;
grid-template-columns: 400px 400px 400px;
        grid-template-rows: 400px 400px 400px;
        grid-template-areas:  
        'a1 a2 a2 '
        'a1 a3 a4 '
        'a5 a6 a7 ';  
        gap: 12px;
        
.a1{
    background: blue;
    grid-area: a1;    
        width: 100%;
        height: 100%;
      
 
}
.a1:hover{
    background: #ddddeb;
    height: 90%;
    width: 90%;
    margin: auto auto;
}
.a2{
  
    background: #41418f;
    grid-area: a2;  
}
.a2:hover{
    background: #ddddeb;
    margin-top: -50px;
    height: 100%;
}
/* .a3{
    height: 100%;
    width:100%;
    background: #595993;
    grid-area: a3;
    transition: width 3s ease, height 3s ease;
}
.a3:hover{    
    background: #ddddeb;
    height: 120%;
    width:120%;
    margin: auto auto;
    margin-top: -10%;
    margin-left: -10%;
    z-index: 2;
} */
.a3 {
    background: #595993;
    grid-area: a3;
    z-index: 2;
    overflow: hidden;
    transition: transform 3s ease; /* transform 속성에만 transition을 적용합니다. */
    transform-origin: center;
    transform: scale(1); /* 초기 크기를 1로 설정합니다. */
}

.a3:hover {    
    background: #ddddeb;
    transform: scale(1.2); /* hover 시 1.2배로 확대됩니다. */
}
.a4{
    background: #6d6d7a;
    grid-area: a4;
    z-index: 1;
}
.a4:hover{
        background: rgba(0,0,0,0);
}

.a5{
    width:100%;

    grid-area: a5;
    transition: width 3s;

}
.a5:hover{
     width:150%;
     z-index:2;    
}
.a7{
    background: linear-gradient(rgba(0,0,0,0.0), yellow);
    grid-area: a7;
}
.a1, .a2, .a3, .a4, .a5,.a6, .a7 {
    border-radius: 20px;
   border: 1.5px solid black;
  }
`;
const A6Styled = styled.div`
  width: 100%;
  grid-area: a6;
  transition: transform 4s ; /* Transition on transform property */
  transform-origin: right;
  transform: scaleX(1); /* Initial width */

  ${(props) =>
        props.asd &&
        css`
    width:40%;
    height:100%;
    margin-left: 240px;
      transform: scaleX(0); /* Shrinking width */
      background-color: #e48383;
 
   
    `}
`;

const Test2 = () => {
    const elements = [];
    const [isMouseDown, setIsMouseDown] = useState(false);
    return <Test2Css>
        <div className="a1"><div className="a11"></div> </div>
        <div className="a2"> </div>
        <div className="a3"> </div>
        <div className="a4"> </div>
        <div className="a5"
            isMouseDown={isMouseDown}
            onMouseDown={() => setIsMouseDown(!isMouseDown)}
        ></div>
        <A6Styled className="a6" asd={isMouseDown}> </A6Styled >
        <div className="a7"> </div>
        {elements}
    </Test2Css>

}
export default Test2;