import styled from "styled-components";
const FootCss = styled.div`
  width: 100%;
  height: 400px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div {
    font-size: 12px;
    margin-top: 50px;
  }
  .content1 {
    width: 40%;
    height: 300px;
    /* border: 1px solid black; */
    ul {
      list-style-type: none;
    }
  }
  .content2 {
    width: 30%;
    height: 300px;
    /* border: 1px solid black; */
  }
  .content3 {
    width: 30%;
    height: 300px;
    /* border: 1px solid black; */
    ul {
      list-style-type: none;
    }
  }
`;

const Foot = () => {
  return (
    <FootCss>
      <div className="content1">
        <ul>
          <li>(주) Creer</li>
          <li>주소 : 서울시 강남구 역삼동 테헤란로</li>
          <li>본 사이트는 프로젝트용 사이트이며 실제 거래사이트가 아닙니다.</li>
          <li>따라서 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.</li>
        </ul>
      </div>
      <div className="content2"></div>
      <div className="content3">
        <ul>
          <li>고객센터 : 평일 오전 10시 ~ 오후 6시 연중무휴</li>
          <li>대표번호 : 02-6959-2153</li>
          <li>제휴문의 : www.khcampus.or.kr</li>
        </ul>
      </div>
    </FootCss>
  );
};
export default Foot;
