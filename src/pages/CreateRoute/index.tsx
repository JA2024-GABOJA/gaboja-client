import ChevronForward from '@/assets/IoChevronForwardOutline.svg?react';
import ClockIcon from '@/assets/clock.svg?react';
import PointIcon from '@/assets/icons/PointIcon';
import {
  useCurrentAddress,
  useCurrentCoordinate,
  useWalkingPathLayer,
  useWalkingPathPoints,
} from '@/hooks';
import useCoordinatesLayer from '@/hooks/useCoordinatesLayer';
import { useMinStore } from '@/store';
import MapView from '@components/MapView';
import { Layout } from '@components/layout';
import { useMemo } from 'react';
import { useState } from 'react';
import StartCreateRoute from './StartCreateRoute';

export enum JuggingStatus {
  start = 'start',
  jugging = 'jugging',
  stop = 'stop',
  end = 'end',
}

const CreateRoutePage = () => {
  const { currentCoordinate } = useCurrentCoordinate();
  const { currentAddress } = useCurrentAddress({
    currentCoordinate,
  });
  const walkingDurationMinutes = useMinStore((state) => state.min);

  const { walkingPathPoints } = useWalkingPathPoints({
    currentCoordinate,
    walkingDurationSeconds: walkingDurationMinutes * 60 * 2,
  });
  console.log(walkingPathPoints);

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

  const { layers: pathLayer, pathLoading } = useWalkingPathLayer({
    walkingPathPoints: walkingPathPoints ?? [],
  });

  const coordinatesLayer = useCoordinatesLayer(walkingPathPoints ?? []);

  const allLayers = [...pathLayer, coordinatesLayer];
  console.log(pathLayer);
  return (
    <Layout $padding={'0'}>
      <FixedHeader>
        <HeaderContainer>
          <AddressText>
            <ChevronForward />
            <PointIcon color={'#FFFFFF'} />

            <Text>{currentAddress?.join(', ')}</Text>
          </AddressText>
          <TimeIndicator startTime={new Date().getTime()} duration={45} />
        </HeaderContainer>
        <CountHeart number={numHearts} />
      </FixedHeader>
      <MapView
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        defaultCoordinate={
          centroids.latitude && centroids.longitude
            ? centroids
            : currentCoordinate
        }
        zoom={14.3}
        layers={allLayers}
      />

      <FloatingButton>Start Jup-gging</FloatingButton>
    </Layout>
  );
};

export default CreateRoutePage;
