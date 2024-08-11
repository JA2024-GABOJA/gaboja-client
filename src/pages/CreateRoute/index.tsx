import {
  useCurrentAddress,
  useCurrentCoordinate,
  useWalkingPathLayer,
  useWalkingPathPoints,
} from '@/hooks';
import useCoordinatesLayer from '@/hooks/useCoordinatesLayer';
import { useMinStore, useModalState } from '@/store';
import MapView from '@components/MapView';
import { Layout } from '@components/layout';
import { useMemo } from 'react';
import { useState } from 'react';
import StartCreateRoute from './StartCreateRoute';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { ImEye } from 'react-icons/im';
import styled from '@emotion/styled';
import { IoNavigateCircle, IoResize } from 'react-icons/io5';
import FootIcon from '@/assets/icons/FootIcon';
import TimerIcon from '@/assets/timer.svg?react';
import HeartIcon from '@/assets/heart.svg?react';
import dayjs from 'dayjs';
import useTimer from '@/hooks/useTimer';

export enum JuggingStatus {
  start = 'start',
  jugging = 'jugging',
  stop = 'stop',
  end = 'end',
}

const CreateRoutePage = () => {
  const [status, setState] = useState<JuggingStatus>(JuggingStatus.start);

  const [zoom, setZoom] = useState(14.3);
  const [isZoom, setIsZoom] = useState(false);

  const handleZoom = () => {
    if (isZoom) {
      setZoom(14.3);
      setIsZoom(false);
    } else {
      setZoom(17.5);
      setIsZoom(true);
    }
  };

  const { currentCoordinate } = useCurrentCoordinate();
  const { currentAddress } = useCurrentAddress({
    currentCoordinate,
  });
  const walkingDurationMinutes = useMinStore((state) => state.min);

  const { walkingPathPoints } = useWalkingPathPoints({
    currentCoordinate,
    walkingDurationSeconds: walkingDurationMinutes * 60 * 2,
  });

  // mean longitute and latitude of the path
  const centroids = useMemo(() => {
    const points = walkingPathPoints ?? [];
    const sum = points.reduce(
      (acc, point) => {
        return {
          latitude: acc.latitude + point.latitude,
          longitude: acc.longitude + point.longitude,
        };
      },
      { latitude: 0, longitude: 0 }
    ) ?? { latitude: 0, longitude: 0 };

    return {
      latitude: sum.latitude / points.length,
      longitude: sum.longitude / points.length,
    };
  }, [walkingPathPoints]);

  const numHearts = useMemo(() => {
    return (
      walkingPathPoints?.filter((point) => point.type === 'target').length ?? 0
    );
  }, [walkingPathPoints]);

  const { layers: pathLayer } = useWalkingPathLayer({
    walkingPathPoints: walkingPathPoints ?? [],
  });

  const { modal, onCloseModal } = useModalState();

  // const { data } = useQuery({
  //   queryKey: ['user', `${modal?.id}`],
  //   queryFn: () => getPOIImage(modal?.id || 0),
  //   enabled: !!modal?.id,
  // });

  // console.log(data);

  const { time, onStart } = useTimer();

  const coordinatesLayer = useCoordinatesLayer(walkingPathPoints ?? []);

  const allLayers = [...pathLayer, coordinatesLayer];

  const handleJuggingStart = () => {
    setState(JuggingStatus.jugging);
    onStart();
  };

  return (
    <Layout $padding={'0'}>
      {status === JuggingStatus.start && (
        <StartCreateRoute
          onJuggingStart={handleJuggingStart}
          numHearts={numHearts}
          addressText={currentAddress?.join(',') || ''}
        />
      )}
      {status === JuggingStatus.jugging && (
        <>
          <FloatingBox>
            <Banner>
              <IoNavigateCircle size={20} color={'#fff'} />
              <strong>250 steps</strong> to get heart
            </Banner>
            {!isZoom ? (
              <Button
                _hover={{
                  bg: '#3176B1',
                }}
                bg={'#3176B1'}
                color={'#fff'}
                gap={2}
                onClick={handleZoom}
              >
                <ImEye />
                View all
              </Button>
            ) : (
              <Button
                _hover={{
                  bg: '#3176B1',
                }}
                bg={'#81D694'}
                color={'#fff'}
                gap={2}
                onClick={handleZoom}
              >
                <IoResize color={'#fff'} />
                Zoom in
              </Button>
            )}
          </FloatingBox>
          <BottomSheet>
            <IconsWrapper>
              <IconWrapper>
                <FootIcon />
                <p>Total steps</p>
                <p>0</p>
              </IconWrapper>
              <IconWrapper>
                <HeartIcon />
                <p>My Hearts</p>
                <p>0</p>
              </IconWrapper>
              <IconWrapper>
                <TimerIcon />
                <p>Time</p>
                <p>{dayjs(new Date(time * 1000)).format('mm:ss')}</p>
              </IconWrapper>
            </IconsWrapper>
            <EndButton>Jup-gging ended</EndButton>
          </BottomSheet>
        </>
      )}

      <MapView
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        defaultCoordinate={
          isZoom
            ? currentCoordinate
            : centroids.latitude && centroids.longitude
            ? centroids
            : currentCoordinate
        }
        zoom={zoom}
        layers={allLayers}
      />
      <Modal
        isOpen={status === JuggingStatus.jugging && modal?.type === 'target'}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent
          minWidth={'300px'}
          style={{
            position: 'relative',
            padding: '20px',
            top: '20%',
            maxWidth: '330px',
          }}
        >
          <HeartIconImage src="heart.png" />
          <ModalCloseButton />
          <ModalBody
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '20px',
              gap: '9px',
            }}
          >
            <Title>Please pick up</Title>
            <Subtitle>
              <strong>the abandoned heart</strong>
              <br />
              in the photo
            </Subtitle>
            <StyledImage src="example.png" />
            <ButtonGroup>
              <Button bg={'#C5C5C5'} onClick={onCloseModal}>
                Do it later
              </Button>
              <Button bg={'#E56447'} onClick={onCloseModal}>
                Pick up
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Modal
        isOpen={modal === 'target' && status === JuggingStatus.jugging}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent
          minWidth={'300px'}
          style={{
            position: 'relative',
            padding: '20px',
            backgroundColor: '#E56447',
            top: '20%',
            maxWidth: '330px',
          }}
        >
          <HeartIconImage src="heart.png" />
          <ModalCloseButton />
          <ModalBody
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '20px',
              gap: '9px',
            }}
          >
            <Title>Successfully</Title>
            <Subtitle>Picked up!</Subtitle>
            <Button bg={'#C5C5C5'} onClick={onCloseModal}>
                Do it later
              </Button>
            <ButtonGroup>
              <Button bg={'#C5C5C5'} onClick={onCloseModal}>
                Do it later
              </Button>
              <Button bg={'#E56447'} onClick={onCloseModal}>
                Pick up
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </Layout>
  );
};

const HeartIconImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 69px;
  height: 80px;
  transform: translate(-50%, -50%);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  button {
    color: var(--gray-white, #f6f6f6);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'SF Pro';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 100% */
    width: 100%;
  }
`;

const Title = styled.p`
  color: #000;

  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'SF Pro';
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 85.714% */
`;

const Subtitle = styled.p`
  strong {
    color: var(--main-color, #e56447);
  }
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'SF Pro';
  font-size: 22px;
  font-style: normal;
  font-weight: 510;
  line-height: 26px; /* 118.182% */
`;

const StyledImage = styled.img`
  width: 297px;
  height: 209px;
  border-radius: 18px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;

  margin-bottom: 20px;
`;

export default CreateRoutePage;

const EndButton = styled.div`
  padding: 24px;
  border-radius: 67px;
  background: rgba(166, 211, 249, 0.74);

  color: #fff;

  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
`;
const BottomSheet = styled.div`
  position: fixed;
  max-width: 420px;
  width: 100%;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 0px 4px 43px 0px rgba(0, 0, 0, 0.25);
`;

const Banner = styled.div`
  padding: 14px 7px 14px 7px;
  border-radius: 9px;
  background: #353535;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  color: #fff;
  gap: 3px;
  display: flex;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  strong {
    color: var(--main-color, #e56447);

    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 90.909% */
  }
`;

const FloatingBox = styled.div`
  position: fixed;
  width: 100%;
  max-width: 420px;
  padding: 24px;
  top: 0;

  left: 50%;
  transform: translateX(-50%);

  z-index: 10;
`;
