import { useState } from "react";
import styled, { css } from "styled-components";

const Test3Css = styled.div`   
margin-top: -10px;
display:  grid;
width: 100%;
height: 350px;
.slideBox{
    display: flex;    
    width: 100%;
    height: 350px;
img{
    width: 100%;
    height: 100%;
}
}
.slideBut {
  display: flex;
  margin-top: -380px;
    justify-content: space-between;
    align-items: center; /* 수직 중앙 정렬 추가 */
    .but1,
    .but2 {     
      width: 50px;
      height: 50px;
      background-color:#6363631f;
      border-radius: 50px;
      border: 1px solid #b4b4b421;
    }
  }
/* .but2{
  width : 50px;
  height: 50px;
} */

`
  ;

export const SlideOne = () => {
  const list = [];
  list.push("https://image.idus.com/image/files/ebebbddfc2fc4b6ca1064cb28bbb447e.jpg");
  list.push("https://image.idus.com/image/files/0590592b1598475c9b7c0b3f4331054c.jpg");
  list.push("https://image.idus.com/image/files/3e01d0b3962f4f0297fea7a372243637.jpg");
  const [i, setI] = useState(0);
  const img1 = () => {
    const images = [];
    const numImagesToShow = 1;
    console.log(i)
    if (i == 0) {
      setI(6)
    }
    for (let a = 0; a < numImagesToShow; a++) {
      const index = (i + a) % list.length;
      images.push(<img key={index} src={list[index]} alt={`Image ${index}`} />);
    }

    return images;
  };

  console.log(i)

  return (

    <Test3Css>
      <div className="slideBox">
        {img1()}
      </div>
      <div className="slideBut">
        <button className="but1" draggable={true} onClick={() => { setI(i + 1) }}>〈</button>
        <button className="but2" onClick={() => { setI(i - 1) }}>〉</button>
      </div>
    </Test3Css>
  )

}
