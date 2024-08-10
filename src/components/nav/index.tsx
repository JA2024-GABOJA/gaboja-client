import styled from '@emotion/styled';

const BottomNavigation = () => {
  return (
    <BottomNavigationWrapper>
      <nav>
        <p>내 줍깅기록</p>
      </nav>
      <StartButton />
      <nav>
        <p>내 정보</p>
      </nav>
    </BottomNavigationWrapper>
  );
};

export default BottomNavigation;

const StartButton = styled.div`
  position: absolute;
  background-color: #e56447;
  border: 1px solid #fff;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 93px;
  height: 93px;
  flex-shrink: 0;

  border-radius: 50%;
`;
const BottomNavigationWrapper = styled.div`
  position: fixed;
  max-width: 420px;
  display: flex;
  bottom: 0;

  width: 100%;
  padding: 13px 44px 21px 43px;
  justify-content: space-between;

  border-radius: 20px 20px 0px 0px;
  background: var(--Backgrounds-Primary, #fff);
  box-shadow: 0px 4px 43.1px 0px rgba(0, 0, 0, 0.25);

  nav {
    width: 70px;
    height: 56px;

    color: #000;

    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'AppleSDGothicNeoEB00';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.23px;
  }
`;
