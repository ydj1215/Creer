import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Body = styled.div`
max-width: 1280px;
width: 100%;
height: auto;
margin: 0 auto;
`;
const A = styled.div`
width: 100%;
height: auto;
margin-top: 10px;
`;

const A1 = styled.div`

height:350px;
width: 100%;
/* https://image.istarbucks.co.kr/upload/common/img/main/2023/231116_christmas2_img.png) */
background: url("https://png.pngtree.com/background/20210715/original/pngtree-creative-christmas-gift-box-decoration-green-texture-background-picture-image_1282191.jpg") fixed;
background-size: 100% 100%;
background-repeat: no-repeat;
position: relative;




p{
  font-family:sans-serif;
  color: white;
  width:50px;
  font-size: 4em;
  position: absolute;
  top: 100px;
  left: 150px;
  ${({ bb }) =>
    bb == 0
      ? css`
            animation: slide 3s forwards;
          `
      : css`
            animation: slide2 3s forwards;
          `};
  }

  @keyframes slide {
    0% {
      opacity: 1;
      right: -100px;
    }
    100% {
      opacity: 0;
      right: 0px;
    }
  }

  @keyframes slide2 {
    0% {
      opacity: 0;
      left: -100px;
    }
    100% {
      opacity: 1;
      left: 150px;
    }
  }
`;

const Photo1 = styled.div`
  height: 500px;
  width: 450px;
  background: url("https://image.istarbucks.co.kr/upload/common/img/main/2023/christmas_img.png");
  background-size: 300px;
  background-repeat: no-repeat;
  position: absolute;
  top: 80px;
  right: ${({ asdw }) => (asdw > 100 ? '-50px' : '300px')}; 
  /* Adjust the position */
  opacity: ${({ asdw }) => (asdw > 100 ? '1' : '0')}; /* Initially hidden */
  transition: opacity 0.5s ease; /* Transition effect for opacity change */

  /* Additional styling or transform: translateX() can be added if needed */
`;

export const Slide2 = () => {
  const [position, setPosition] = useState(0);

  const onScroll = () => {

    setPosition(window.scrollY);
  }
  useEffect(() => {

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }

  }, [])
  return (
    <Body>
      <A><A1 bb={position}>
        <Photo1 asdw={position} /><p> Christmas  Gifts</p>
      </A1></A>

    </Body>
  );
}

