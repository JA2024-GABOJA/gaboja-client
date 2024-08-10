import { Layout } from '@components/layout';
import styled from '@emotion/styled';
import ChevronForward from '@/assets/IoChevronForwardOutline.svg?react';
import PointIcon from '@/assets/icons/PointIcon';
import dayjs from 'dayjs';
import ClockIcon from '@/assets/clock.svg?react';

const CreateRoutePage = () => {
  return (
    <Layout>
      <FixedTopHeader />
    </Layout>
  );
};

export default CreateRoutePage;

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

const FixedTopHeader = () => {
  return (
    <FixedBottomFooter>
      <AddressText>
        <ChevronForward />
        <PointIcon color={'#FFFFFF'} />

        <p>2 Sangdaero, Namgu, Pohang-si</p>
      </AddressText>
      <TimeIndicator startTime={new Date().getTime()} duration={45} />
    </FixedBottomFooter>
  );
};

const TimeIndicatorWrapper = styled.div`
  padding: 13px 20px;

  margin-top: 20px;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  background: #fff;
  border-radius: 85px;
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

const FixedBottomFooter = styled.div`
  position: fixed;
  width: 100%;
  max-width: 420px;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #3176b1;
  padding: 20px 24px;
`;
