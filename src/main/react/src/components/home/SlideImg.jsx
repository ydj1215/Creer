import { useState } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";

const Contetn3Item1Css = styled.div`

width: 100%; 
.metn2{
 margin-top: 100px;
}
`;
const Slider = styled.div`
    p {
        font-weight: bold;
        font-size: 30px;
        margin: 30px 80px;
    }
    ul, li {
        list-style: none;
    }

    .slide_container {
        overflow: hidden;

        .slide_wrapper {
            display: flex;
            flex-wrap: nowrap;
            background-color: #ffffff;
    
        }
        .lb-wrap {
        width: 70%;
        margin: 10px auto;
        margin-left: 30px;
        position: relative;
        } 
        .lb-text {
        display: flex;
        width: 110%;
        text-align: center;
        justify-content: center;
        position: absolute;
        flex-direction: row;
        margin-top: -100px;
        right:0;
        left: 0;
        top: 300px;
        }
        .lb-text2 {
        
        width: 100%;
        text-align: center;
        justify-content: center;
        position: absolute;     
        color: white;
        margin-top: -30px;
        
        right:0;
        left: 0;
        top: 300px;
        }
        .lb-text h2 {
            font-size: 40px;
            font-weight: bold;
            color: white;
            text-shadow: 0 5px 10px black;
        }
        .lb-text2 p {
            font-size: 20px;
            font-weight: bold;
            color: white;
            margin-left: 10px;
            text-shadow: 0 5px 10px black;
            margin-top: -20px;
            /* margin-bottom: 600px; */
            width: 100%;
        }

        .lb-text p {
            font-size: 20px;
            font-weight: bold;
            color: white;
            margin-left: 10px;
            text-shadow: 0 5px 10px black;
            /* margin-bottom: 30px; */
            width: 100%;
            background-color: red;
        }

        .slide {

            object-fit: cover;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            position: relative;
            padding: 40px 0;

            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 3%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }
            &.original {
                animation: 60s linear infinite normal none running
                    infiniteAnimation1;
            }
            &.clone {
                animation: 60s linear infinite infiniteAnimation2;
            }
            &.stop {
                animation-play-state: paused;
            }

            li {
                margin: 0 80px;
                cursor: pointer;
                z-index: 2;
                transition: .5s;
                transform: scale(1);
                &:hover {//마우스 가면 해당 오브젝트 커지는 scale
                    transform: scale(1.1);
                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        width: 100%;
                        height: 190%;
                        //마우스 올라가면 흐려짐
                      
                    }
                }
                &.big {
                    width: 300px;
                    height: 300px;
                    margin: 0 40px;     
                }
                .item {
                    background-size: cover;
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                    box-shadow: 0 5px 10px black;
                }
            }
        }
    }
    @keyframes infiniteAnimation1 {
    0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(100%);
    }
    50.1% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0%);
    }
}
@keyframes infiniteAnimation2 {
    0% {
        transform: translateX(-200%);
    }
    100% {
        transform: translateX(0%);
    }
}
`;

const slides = [
    { url: "https://d24y2yfxh2iebm.cloudfront.net/resized/thumbnail/classImages/26dab311-e421-48d3-bcb6-4c1b28494837", target: "C1", title: " 패션", ment: "   " },
    { url: "https://modo-phinf.pstatic.net/20200316_27/15843311254216wzG4_JPEG/mosa42HKAJ.jpeg?type=w1100", target: "C14", title: "가구", ment: "  " },
    { url: "https://img.khan.co.kr/news/2020/11/26/l_2020112601003012200255941.jpg", target: "C20", title: "간식", ment: '' },
    { url: "https://qi-o.qoo10cdn.com/goods_image_big/6/9/0/0/8622526900c_l.jpg", target: "C6", title: "인형", ment: " '" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJByDIyipaCFz9yGBXbydiaJrWx8DgWaCUQ&usqp=CAU", target: "C24", title: "캔들", ment: " " },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS83dU-HEEUvnXptUu_ogAtm7FNtO_7QwuN2OSgiE-qsMl0_BF__l2rKXWL8K9MUWcXz2E&usqp=CAU", target: "C33", title: "반려", ment: "" },
    { url: "https://ko.ljwoodencrafts.com/uploads/202131986/handmade-colorful-carved-wooden-square07517091653.jpg", target: "C9", title: "공예", ment: "" }
];


export const SlideImg = () => {
    const [animate, setAnimate] = useState(true);//트루면 작동
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);
    const navigate = useNavigate();
    const GoodsLink = (couse) => {
        window.localStorage.setItem("CourseArea", couse);
        navigate("/Course/Info");
    }
    return (
        <>
            <Contetn3Item1Css>
                <div className="metn2">
                    <Slider>
                        <div className="slide_container">

                            <ul
                                className="slide_wrapper"
                                onMouseEnter={onStop}//마우스 대면멈춤
                                onMouseLeave={onRun}//마우스 떠나면움직음
                            >
                                <div
                                    className={"slide original".concat(
                                        animate ? "" : " stop"
                                    )}
                                >
                                    {slides.map((s, i) => (
                                        <li
                                            key={i}
                                            className={"big"}
                                            onClick={() => GoodsLink(s.target)}
                                        >
                                            <div className="lb-wrap">
                                                <div className="lb-text">
                                                    <h2>{s.title}</h2>
                                                </div>
                                                <div className="lb-text2">
                                                    <p>{s.ment}</p>
                                                </div>
                                            </div>

                                            <div
                                                className="item"
                                                style={{ backgroundImage: `url(${s.url})`, backgroundPosition: 'center' }}
                                            ></div>

                                        </li>
                                    ))}
                                </div>
                                <div
                                    className={"slide clone".concat(animate ? "" : " stop")}
                                >
                                    {slides.map((s, i) => (
                                        <li
                                            key={i}
                                            className={"big"}
                                            onClick={() => GoodsLink(s.title)}
                                        >
                                            <div className="lb-wrap">
                                                <div className="lb-text">
                                                    <h2>{s.title}</h2>
                                                </div>
                                                <div className="lb-text2">
                                                    <p>{s.ment}</p>
                                                </div>
                                            </div>

                                            <div
                                                className="item"
                                                style={{ backgroundImage: `url(${s.url})`, backgroundPosition: 'center' }}
                                            ></div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    </Slider>
                </div>


            </Contetn3Item1Css>

        </>
    )

}
