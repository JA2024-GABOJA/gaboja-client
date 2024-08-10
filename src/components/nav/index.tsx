import styled from '@emotion/styled';
import FootIcon from '../../assets/icons/FootIcon';
import Tooltip from '../Tooltip';
import ProfileIcon from '../../assets/icons/ProfileIcon';

const BottomNavigation = () => {
  return (
    <BottomNavigationWrapper>
      <nav>
        <FootIcon />
        <p>My Jup-gging</p>
      </nav>

      <StartButton />

      <nav>
        <ProfileIcon />
        <p>Profile</p>
      </nav>
    </BottomNavigationWrapper>
  );
};

export default BottomNavigation;

const StartButton = () => {
  return (
    <StartButtonWrapper>
      <Tooltip content="Let’s go Jup-gging!" defaultVisible={true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="129"
          height="129"
          viewBox="0 0 129 129"
          fill="none"
        >
          <g filter="url(#filter0_d_32_2057)">
            <circle cx="64.5" cy="64.5" r="53.5" fill="#F1755B" />
            <circle
              cx="64.5"
              cy="64.5"
              r="52"
              stroke="white"
              stroke-width="3"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_32_2057"
              x="0.7"
              y="0.7"
              width="127.6"
              height="127.6"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_32_2057"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="3.65" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.898039 0 0 0 0 0.392157 0 0 0 0 0.278431 0 0 0 0.33 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_32_2057"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_32_2057"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Tooltip>
    </StartButtonWrapper>
  );
};

const StyledTooltip = styled(Tooltip)`
  padding: 21px;
  background-color: #3176b1;
  border-radius: 10px;

  color: var(--Backgrounds-Primary, #fff);

  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: AppleSDGothicNeoB00;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 111.111% */
  letter-spacing: -0.23px;
`;

const StartButtonWrapper = styled.div`
  position: absolute;
  bottom: 30%;
  cursor: pointer;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  justify-content: center;
`;
const BottomNavigationWrapper = styled.div`
  position: fixed;
  max-width: 420px;
  display: flex;
  bottom: 0;
  left: 0;

  width: 100%;
  padding: 13px 44px 21px 43px;
  justify-content: space-between;
  align-items: center;

  border-radius: 20px 20px 0px 0px;
  background: var(--Backgrounds-Primary, #fff);
  box-shadow: 0px 4px 43.1px 0px rgba(0, 0, 0, 0.25);

  nav {
    width: 105px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #000;

    text-align: center;
    font-family: 'San Francisco';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.23px;

    p {
      margin-top: 4px;
    }
  }
`;
