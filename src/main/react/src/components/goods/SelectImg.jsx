import { useEffect, useState } from "react";
import styled from "styled-components";
import { PictureAxiosApi } from "../../api/goods/PictureAxiosApi";
import { PictureModal } from "../../utils/goods/PictureModal";

const ImgEdit = styled.div`
  height: auto;
  button {
    position: relative;
    z-index: 2;
    color: black;
    font-size: 8px;
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background: #dfdfdf;
  }
`;
const SelectImgCss = styled.div`
  width: 100%;
  height: auto;
  margin-top: -30px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  img {
    border: 2px solid #bcbcbc79;
    padding: 10px;
    width: 120px;
    height: 120px;
    margin: 1px 0;
  }

  .buttons {
    position: absolute;
    width: 640px;
    bottom: 0;
    height: auto;
    border-radius: 50px;

    .buttonsL {
      float: left;
      width: 35px;
      height: 35px;
      color: black;
      border-radius: 50px;
    }
    .buttonsR {
      width: 35px;
      height: 35px;
      color: black;
      border-radius: 50px;
      float: right;
    }
  }
`;

export const SelectImg = ({ num, url, imgview, member, login }) => {
  const perPage = 4; // 페이지당 보여질 이미지 수
  const [urls, setUrls] = useState([{ goodsPictures: url }]); // url prop을 객체로 변환하여 초기화합니다.
  const [currentPage, setCurrentPage] = useState(1);
  const [submitUrl, setSubmitUrl] = useState();
  const [pictureId, setPictureId] = useState();
  const [nickName, setNickName] = useState();
  const [member1, setMember] = useState();

  useEffect(() => {
    setNickName(localStorage.getItem("NickName"));
    setMember(member);
    const selectImg = async () => {
      try {
        const response = await PictureAxiosApi.selectGoodsImg(num);
        if (response.status === 200) {
          setUrls([{ goodsPictures: url }, ...response.data]);
          console.log(response.data);
        } else {
          console.error("서버 응답 실패");
        }
      } catch (error) {
        console.error("submit review 데이터에러 :", error);
      }
    };
    selectImg();
  }, [url]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const LastImage = currentPage * perPage;
  const irstImage = LastImage - perPage;
  const currentImages = urls.slice(irstImage, LastImage);

  const deleteimg = async (e) => {
    try {
      const response = await PictureAxiosApi.deletePictureImg(e);
      if (response.status === 200) {
        console.error("사진 삭제 성공");
      } else {
        console.error("서버 응답 실패");
      }
      window.location.reload();
    } catch (error) {
      console.error("submit review 데이터에러 :", error);
    }
  };

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  return (
    <SelectImgCss>
      {currentImages.map((urlObj, index) => (
        <div key={index}>
          {/* 이미지 클릭 시 urlObj.goodsPictures를 직접 전달 */}
          <img
            src={urlObj.goodsPictures}
            alt=""
            onClick={() => imgview(urlObj.goodsPictures)}
          />
          {urlObj.goodsPictures !== url ? (
            login === true ? (
              <ImgEdit>
                <button
                  onClick={() => {
                    setIsCheckModalOpen(true);
                    setPictureId(urlObj.goodsPictureId);
                    setSubmitUrl(urlObj.goodsPictures);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deleteimg(urlObj.goodsPictureId);
                  }}
                >
                  삭제
                </button>
              </ImgEdit>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      ))}
      {urls.length > perPage && (
        <div className="buttons">
          <button
            className="buttonsL"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            〈
          </button>
          <button
            className="buttonsR"
            onClick={nextPage}
            disabled={LastImage >= urls.length}
          >
            〉
          </button>
        </div>
      )}

      <PictureModal
        isOpen={isCheckModalOpen}
        setIsCheckModalOpen={setIsCheckModalOpen}
        checkMmessage={"사진을 수정합니다."}
        submitUrl={submitUrl}
        pictureId={pictureId}
      />
    </SelectImgCss>
  );
};
