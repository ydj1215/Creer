
import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import * as DOMPurify from 'dompurify';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const QuillTextCss = styled.div`
  width  :100% ;
  height: auto;
`;
const Button1 = styled.div`
  width  :100px ;
  height: auto;  float: right;
  button{
    width  :100px ;
    border-radius: 10px;
  height :60px ;
    background: #ff3d3d;
  
  }
`;

const Content1 = styled.div`
  width  :100% ;
height: 700px;


`;
export const QuillText = ({ goodsDesc, setGoodsDesc }) => {
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }], // 헤더 레벨을 드롭다운 메뉴로
                ["bold", "italic", "underline", "strike"], // 텍스트 스타일 버튼
                [{ color: [] }, { background: [] }], // 색상 선택을 드롭다운 메뉴로
                [{ font: [] }], // 폰트 선택을 드롭다운 메뉴로
                [{ align: [] }], // 정렬 선택을 드롭다운 메뉴로
                ["link", "image", "video"], // 링크, 이미지, 동영상 업로드 버튼
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                ["clean"],
            ], ImageResize: {
                parchment: Quill.import('parchment')
            }
        },
    };

    const [content, setContent] = useState("");
    console.log(content);
    useEffect(() => {
        setContent(goodsDesc)
    }, [goodsDesc])

    const contextChage = (e) => {
        setContent(e)
        setGoodsDesc(e)
    }

    return (
        <QuillTextCss>
            <Content1>
                <ReactQuill
                    style={{ width: "100%", height: "600px" }}
                    modules={modules}
                    value={content}
                    onChange={(e) => { contextChage(e) }}
                />
            </Content1>

        </QuillTextCss>
    );

}
