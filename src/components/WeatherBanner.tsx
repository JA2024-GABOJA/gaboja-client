import styled from '@emotion/styled';

const WeatherBanner = () => {
  return (
    <WeatherBannerWrapper>
      <img />
      <div>
        <p>26°C 구름 많음</p>
        <p>어제보다 2°C 높아요</p>
      </div>
      <div>경북 포항시</div>
    </WeatherBannerWrapper>
  );
};

export default WeatherBanner;

const WeatherBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 19px 20px 18px 20px;
  justify-content: center;
  align-items: flex-end;
  gap: 23px;

  border-radius: 10px;
  background: var(--Backgrounds-Primary, #fff);
`;
