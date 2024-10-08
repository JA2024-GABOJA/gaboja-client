import styled from '@emotion/styled';
import ClockIcon from '@/assets/clock.svg?react';
import { useMinStore } from '@/store';
import PointIcon from '@/assets/icons/PointIcon';

import dayjs from 'dayjs';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const StartCreateRoute = ({
  onJuggingStart,
  numHearts,
  addressText,
}: {
  addressText: string;
  numHearts: number;
  onJuggingStart: () => void;
}) => {
  return (
    <>
      <FixedTopHeader addressText={addressText} numHearts={numHearts} />
      <FloatingButton onClick={onJuggingStart}>Start Jup-gging</FloatingButton>
    </>
  );
};

export default StartCreateRoute;

const FixedTopHeader = ({
  addressText,
  numHearts,
}: {
  addressText: string;
  numHearts: number;
}) => {
  const { min } = useMinStore();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <FixedHeader>
      <HeaderContainer>
        <AddressText>
          <IoChevronBack onClick={handleBack} color="#fff" size={20} />
          <PointIcon color={'#FFFFFF'} />
          <p>{addressText}</p>
        </AddressText>
        <TimeIndicator startTime={new Date().getTime()} duration={min} />
      </HeaderContainer>
      <CountHeart number={numHearts} />
    </FixedHeader>
  );
};

const CountHeart = ({ number }: { number: number }) => {
  return <StyledCountHeart>Discover {number} hearts!</StyledCountHeart>;
};

const StyledCountHeart = styled.div`
  border-radius: 10px;
  background: hsla(0, 0%, 20.784313725490197%, 0.7);
  color: #fff;

  margin-top: 15px;

  width: 100%;
  transform: translateX(-50%);
  max-width: 380px;

  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 510;
  line-height: 20px; /* 100% */

  padding: 20px 0;
`;

interface TimeIndicatorProps {
  startTime: number;
  duration: number;
}

const TimeIndicator = ({ startTime, duration }: TimeIndicatorProps) => {
  const date = dayjs(startTime).format('HH:mm A');

  const endDate = dayjs(startTime).add(duration, 'minute').format('HH:mm A');

  return (
    <TimeIndicatorWrapper>
      <TimeTextWrapper>
        <p>{date}</p>
        <p>-</p>
        <p>{endDate}</p>
      </TimeTextWrapper>
      <Divider />
      <DurationText>
        <ClockIcon />
        <p>{duration}</p>
      </DurationText>
    </TimeIndicatorWrapper>
  );
};

const DurationText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;
const Divider = styled.div`
  width: 3px;
  background-color: #dbdbdb;
`;
const TimeTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  color: #000;

  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'SF Pro';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 25px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  max-width: 380px;
  width: calc(100% - 40px);
  padding: 28px 80px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 41px;
  background: var(--main-color, #e56447);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);

  color: #fff;

  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 76.923% */
  letter-spacing: -0.23px;
`;

const TimeIndicatorWrapper = styled.div`
  padding: 13px 20px;

  margin-top: 20px;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  background: #fff;
  border-radius: 85px;
`;

const FixedHeader = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  top: 0;
  left: 50%;
`;

const HeaderContainer = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, 0);
  background-color: #3176b1;
  padding: 20px 24px;
`;

const AddressText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  align-items: center;

  color: #fff;

  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 111.111% */
  letter-spacing: -0.23px;
`;
