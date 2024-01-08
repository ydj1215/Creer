import styled from "styled-components";
import KakaoImg from "../../images/kakao.png";

export const SocialLinks = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

export const SocialLink = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${KakaoImg});
  background-size: cover;
  transition: background-image 0.5s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;
