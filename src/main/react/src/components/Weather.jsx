import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const WeatherBox = styled.div`
  width: 288px;
  margin-top: 20px;
  max-height: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Radio
const Input = styled.input`
  display: none;

  &:checked + label {
    font-weight: bold;
  }
`;

const RadioLabel = styled.label`
  width: 100%;
  margin-right: 1rem;
  cursor: pointer;
`;

const CityRadioButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: horizontal-tb; // 텍스트 가로 일렬로 배치
`;

const Information = styled.div`
  width: 288px;
  display: flex;
  justify-content: space-evenly; // 여백을 동일하게 분배
  text-align: center;
`;

const About = styled.div``;

// 한글 도시명으로 구성된 배열
const cities = ["부산", "대구", "대전", "광주", "인천", "서울"];

export const Weather = () => {
  // 상태 관리
  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState("Seoul");
  const [loading, setLoading] = useState(false);

  // 도시 변경 핸들러
  const handleCityChange = (event) => {
    // 도시명을 한글로 표시되지만, 영어로 넘기기
    const koreanCity = event.target.value;
    const englishCity = mapKoreanToEnglish(koreanCity);
    setSelectedCity(englishCity);
  };

  // API 요청 함수
  const fetchWeatherData = () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("날씨 정보를 받아오는데 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 한글 도시명을 영어 도시명으로 매핑하는 함수
  const mapKoreanToEnglish = (koreanCity) => {
    switch (koreanCity) {
      case "부산":
        return "Busan";
      case "대구":
        return "Daegu";
      case "대전":
        return "Daejeon";
      case "광주":
        return "Gwangju";
      case "인천":
        return "Incheon";
      case "서울":
        return "Seoul";
      default:
        return koreanCity;
    }
  };

  // 도시를 선택할 때마다 렌더링
  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity]);

  return (
    <>
      <WeatherBox>
        {/* 날씨 상세 정보 */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.name !== undefined && (
            // loading = false, data.name이 정의되어 있어야 코드를 실행
            <Information>
              <About>
                {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
                {/* <p>체감 온도</p> */}
              </About>

              <About>
                {data.main ? <p>{data.main.humidity}%</p> : null}
                {/* <p>습도</p> */}
              </About>

              <About>
                {data.wind ? <p>{data.wind.speed.toFixed(1)}m/s</p> : null}
                {/* <p>풍속</p> */}
              </About>
            </Information>
          )
        )}

        {/* 도시 라디오 버튼 그룹 */}
        <CityRadioButtons>
          {cities.map((city) => (
            <React.Fragment key={city}>
              <Input
                type="radio"
                id={city}
                value={city}
                checked={selectedCity === mapKoreanToEnglish(city)}
                onChange={handleCityChange}
              />
              <RadioLabel htmlFor={city}>{city}</RadioLabel>
            </React.Fragment>
          ))}
        </CityRadioButtons>
      </WeatherBox>
    </>
  );
};
