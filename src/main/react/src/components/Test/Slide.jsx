import { useState } from "react";
import styled, { css } from "styled-components";

const Test3Css=styled.div`   
margin-top: 100px;
display:  grid;
width: 100%;
height: 300px;

.slideBox{
    display: flex;    
   justify-content: space-between;
    width: 100%;
height: 300px;

img{
    width: 30%;
    height: 100%;
}

}
.slideBut{
  display: flex;
 justify-content: space-between;
 margin-top: -180px;
  .but1{
  width : 50px;
  height: 50px;
}
.but2{
  width : 50px;
  height: 50px;
}
}

`
;

export const Slide =()=>{
    const list=[];   
    list.push("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTlfMjg1%2FMDAxNjk3Njc5ODcyODkw.kMkk-lYi9d-_PTtmIinKYLKrTVoNKGzVkDc7WQOQHjMg.7HJRrBlIbl0SOKdw3uoyXhQKV5nBM1icN16kHJxH3YIg.JPEG.star_cat_%2F20231019_092231.jpg&type=a340");
    list.push("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MjdfMjI3%2FMDAxNjkwNDMzNTYyNjYw.J7RRKn1Wo5YcraGOQT77hxjweRazFAFFKILxQK6_Rmkg.MgouAUqnc5W9YKtgM5SatWbthwFIyg1hzAqVIerMd7Mg.JPEG.vettnk%2F4%25BF%25F4%25B4%25C2%25B0%25ED%25BE%25E7%25C0%25CC.jpeg&type=a340");
    list.push("data:image/jpeg;base64,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");
  const [i,setI]=useState(0);
  const img1 = () => {
    const images = [];
    const numImagesToShow = 1; // Number of images to display at once
   console.log(i)
   if(i==0){
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
           <button className="but1" draggable={true} onClick={()=>{setI(i+1)}}> 1</button>
           <button className="but2" onClick={()=>{setI(i-1)}}>2</button>
           </div>
    </Test3Css>
)

}
