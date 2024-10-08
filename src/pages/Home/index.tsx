import styled from '@emotion/styled';
import { Layout } from '../../components/layout';
import BottomNavigation from '../../components/nav';
import WeatherBanner from '../../components/WeatherBanner';
import ChevronIcon from '../../assets/icons/ChevronIcon';
import PointIcon from '../../assets/icons/PointIcon';
import { DEFAULT_COORDINATES } from '@/constants';
import useGetAddress from '@/hooks/useGetAddress';

const Background = styled.img`
  position: absolute;
  width: 100dvh;
  height: calc(100dvh - 96px);
  left: 0;
  top: 0;
  z-index: 1;
`;
const HomePage = () => {
  const { data } = useGetAddress({
    latitude: DEFAULT_COORDINATES[0],
    longitude: DEFAULT_COORDINATES[1],
  });

  return (
    <Layout
      style={{
        backgroundColor: '#79C6B5',
      }}
    >
      <Background src={'./home.jpeg'} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <AddressText>
          <PointIcon /> {data[0]}
        </AddressText>

        <WeatherBanner />
        <BottomNavigation />
        <HomeTitle>
          Hello, <strong>Mr.Kim</strong>!
          <br /> It's a nice day today
        </HomeTitle>
        <SubTitleButton>
          Should we check the hearts
          <br />
          <p>
            collected yesterday? <ChevronIcon />
          </p>
        </SubTitleButton>
      </div>
    </Layout>
  );
};

export default HomePage;

const AddressText = styled.div`
  display: flex;
  gap: 4px;
  color: #bcbcbc;
  margin-bottom: 14px;

  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'SF Pro';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: -0.23px;
`;

const SubTitleButton = styled.button`
  margin-top: 13px;
  color: var(--dark-gray, #717171);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 130% */
  letter-spacing: -0.23px;

  p {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const HomeTitle = styled.h1`
  color: #000;
  margin-top: 30px;

  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;

  strong {
    font-weight: 900;
  }
`;
