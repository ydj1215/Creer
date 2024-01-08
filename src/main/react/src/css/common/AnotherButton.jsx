import React from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";

// 테마 객체 정의
const theme = {
  background: "#f8f8f8",
  buttonGradient: "linear-gradient(to top, #D8D9DB 0%, #fff 80%, #FDFDFD 100%)",
  buttonBorder: "#8F9092",
  buttonText: "#606060",
  highlightBottom: "0 4px 3px 1px #FCFCFC",
  shadowBottom: "0 6px 8px #D6D7D9",
  shadowTop: "0 -4px 4px #CECFD1",
  highlightTop: "0 -6px 4px #FEFEFE",
  shadowInset: "inset 0 0 3px 0 #CECFD1",
  shadowInsetHover: "inset 0 0 3px 3px #CECFD1",
  shadowInsetFocus: "inset 0 0 10px 0px rgba(0, 0, 250, .6)",
  shadowInsetActive: "inset 0 0 5px 3px #999, inset 0 0 30px #aaa",
  buttonShadowBase:
    "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE",
  buttonShadowDefault:
    "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1",
  buttonShadowHover:
    "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1",
  buttonShadowFocus:
    "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 10px 0px rgba(0, 0, 250, .6)",
  buttonShadowActive:
    "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa",
};

// 버튼 애니메이션 정의
const activeAnimation = keyframes`
  from {
    box-shadow: ${(props) => props.theme.buttonShadowFocus};
  }
  to {
    box-shadow: ${(props) => props.theme.buttonShadowHover};
  }
`;

// 버튼 스타일 정의
const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-image: ${(props) => props.theme.buttonGradient};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.buttonBorder};
  box-shadow: ${(props) => props.theme.buttonShadowDefault};
  transition: all 0.2s ease;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.buttonText};
  text-shadow: 0 1px #fff;

  &:hover:not([disabled]) {
    box-shadow: ${(props) => props.theme.buttonShadowHover};
  }

  &:focus:not(:active) {
    animation: ${activeAnimation} 0.9s alternate infinite;
  }

  &:active:not([disabled]) {
    box-shadow: ${(props) => props.theme.buttonShadowActive};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.icon {
    width: 50px;
    svg {
      margin-top: 3px;
      width: 30px;
      height: 30px;
    }
  }
`;

export const AnotherButton = (props) => {
  const { onClick, width, height, margin, value, padding } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button style={{ width, height, margin, padding }} onClick={onClick}>
        {value}
      </Button>
    </ThemeProvider>
  );
};
