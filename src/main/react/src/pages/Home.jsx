import styled from "styled-components";
import { Slide2 } from "../components/home/Slide2";
import { SlideImg } from "../components/home/SlideImg";
import { SellWay } from "../components/home/SellWay";
const HomeCss = styled.div`
  width  :100% ;
  height: 1200px;

`;

export const Home = () => {
  return (
    <HomeCss>
      <SlideImg></SlideImg>
      <Slide2></Slide2>
      <SellWay></SellWay>
    </HomeCss>
  )
}