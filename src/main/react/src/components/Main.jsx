import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import FootBar from "./Foot";
import styled from "styled-components";

const MainCss = styled.div`
  max-width: 1280px;
  min-width: 768px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    "top"
    "middle"
    "bottom";
  gap: 12px;
`;

const NavCss = styled.div`
  border-bottom: 1px solid black;
  grid-area: top;
`;
const Content = styled.div`
  border-bottom: 1px solid black;
  grid-area: middle;
`;
const FootCss = styled.div`
  border-top: 1px solid black;
  grid-area: bottom;
`;
export const Main = () => {
  return (
    <MainCss>
      <NavCss>
        <NavBar></NavBar>
      </NavCss>
      <Content>
        <Outlet></Outlet>
      </Content>
      <FootCss>
        <FootBar></FootBar>
      </FootCss>
    </MainCss>
  );
};
