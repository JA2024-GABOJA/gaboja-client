import styled from '@emotion/styled';

const WeatherBanner = () => {
  return (
    <WeatherBannerWrapper>
      <img src="/free-icon-cloudy.png" />
      <div>
        <div className="tags">
          <WeatherBannerTag $color={'#ffbc2f'}>PM 10</WeatherBannerTag>
          <WeatherBannerTag $color={'#81D694'}>PM 2.5</WeatherBannerTag>
        </div>
        <p className="title">26°C mostly cloudy</p>
        <p>It's 2°C warmer than yesterday</p>
      </div>
    </WeatherBannerWrapper>
  );
};

export default WeatherBanner;

const WeatherBannerTag = styled.div<{
  $color?: string;
}>`
  border-radius: 42px;
  color: ${(props) => props.$color || 'var(--yellow, #ffbc2f)'};
  width: fit-content;

  border: 1px solid ${(props) => props.$color || 'var(--yellow, #ffbc2f)'};

  text-align: center;
  font-family: 'San Francisco';
  font-size: 11px;
  font-style: normal;
  line-height: 20px; /* 181.818% */
  letter-spacing: -0.23px;
  padding: 0 4px;

  justify-content: center;
  align-items: center;
`;

const WeatherBannerWrapper = styled.div`
  display: flex;
  flex-direction: row;

  border-radius: 10px;
  background: #fff;
  padding: 18px 20px;
  box-shadow: 0px 0px 9.7px -5px rgba(0, 0, 0, 0.25);

  gap: 24px;

  background: var(--Backgrounds-Primary, #fff);
  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  img {
    width: 56px;
    height: 56px;
  }

  .tags {
    display: flex;
    gap: 8px;
  }

  .title {
    color: #000;

    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'SF Pro';
    font-size: 21px;
    font-style: normal;
    font-weight: 590;
    line-height: 20px; /* 95.238% */
    letter-spacing: -0.23px;
  }
`;
