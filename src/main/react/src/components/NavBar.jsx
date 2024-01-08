import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Common } from "../utils/Common";
import { MemberAxiosApi } from "../api/member/MemberAxiosApi";
import { StyledSearch } from "../css/common/StyledSearch";
import { Weather } from "./Weather";
import {
  StyledLogo,
  TopL,
  Top,
  TopR,
  BottomC,
  TopC,
  MemberDropDown,
  GoodsDropDown,
  AuctionDropDown,
  MidR,
  MidRLogged,
} from "../css/NavBarStyle";
import { Reload } from "../utils/Common";

export const NavBar = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [memberView, setMemberView] = useState(false);
  const [goodsView, setGoodsView] = useState(false);
  const [auctionView, setAuctionView] = useState(false);
  // 로그인 판별을 위한 상태
  const [login, setlogin] = useState(window.localStorage.getItem("isLogin"));

  useEffect(() => {
    if (login !== "true") {
      setlogin("false");
    }
  }, [login]);

  useEffect(() => {
    const getMember = async () => {
      // 로컬 스토리지에서 액세스 토큰 읽기
      try {
        // 로그인한 해당 회원의 상세 정보 조회
        const rsp = await MemberAxiosApi.memberGetOne();
        setMember(rsp.data);
        window.localStorage.setItem("NickName", rsp.data.nickName);
      } catch (e) {
        // 액세스 토큰이 만료시 401 오류 발생, 회원 정보 상세 조회 실패시 500 오류 발생
        if (e.response.status === 401 || e.response.status === 500) {
          alert("액세스 토큰이 만료되어 회원 정보를 불러오지 못했습니다!");
          // 리프레시 토큰을 통해 액세스 토큰 및 리프레시 토큰을 재발급
          const newAccessToken = await Common.handleUnauthorized();
          console.log("재발급된 액세스 토큰 : " + newAccessToken);
          const rsp = await MemberAxiosApi.memberGetOne(newAccessToken);
          setMember(rsp.data);
          window.localStorage.setItem("NickName", rsp.data.nickName);
          Reload(navigate);
        }
      }
    };

    if (login === "true") {
      getMember();
    }
  }, [login, navigate]);

  const logout = () => {
    // 로컬 스트리지 비우기
    localStorage.clear();
    navigate("/");
    Reload(navigate);

    // 카카오 로그인 초기화를 위한 쿠키 제거
  };

  return (
    <>
      {/* 기본 */}
      <Top>
        <TopL>
          <Weather></Weather>
        </TopL>
        <TopC>
          <StyledLogo
            onClick={() => {
              navigate("/");
            }}
          ></StyledLogo>
        </TopC>
        <TopR>
          <ul>
            {login === "false" ? ( // 로그인 X
              <>
                {/* 로그인 */}
                <MidR>
                  <li
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    <span>로그인</span>
                  </li>
                  {/* 회원가입 */}
                  <li
                    onClick={() => {
                      navigate("/SignUpBefore");
                    }}
                  >
                    <span>회원가입</span>
                  </li>
                </MidR>
              </>
            ) : (
              // 로그인 O
              <>
                <br />
                <TopR>
                  안녕하세요,{" "}
                  <span>
                    &nbsp;<strong>{member.nickName}</strong>
                  </span>
                  &nbsp;&nbsp;
                </TopR>
                <MidRLogged>
                  <li
                    onClick={() => {
                      setMemberView(!memberView);
                    }}
                  >
                    <span>회원</span>
                    {memberView && (
                      <MemberDropDown onClose={() => setMemberView(false)} />
                    )}
                  </li>

                  <li
                    onClick={() => {
                      setGoodsView(!goodsView);
                    }}
                  >
                    <span>상품</span>
                    {goodsView && (
                      <GoodsDropDown onClose={() => setGoodsView(false)} />
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setAuctionView(!auctionView);
                    }}
                  >
                    <span>경매</span>
                    {auctionView && (
                      <AuctionDropDown onClose={() => setAuctionView(false)} />
                    )}
                  </li>
                  <li
                    onClick={() => {
                      logout();
                    }}
                  >
                    <span>로그아웃</span>
                  </li>
                </MidRLogged>
              </>
            )}
          </ul>
        </TopR>
        <BottomC>
          <StyledSearch />
        </BottomC>
      </Top>
    </>
  );
};
