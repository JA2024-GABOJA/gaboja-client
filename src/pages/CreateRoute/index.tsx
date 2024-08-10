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

  const [status, setStatus] = useState<JuggingStatus>(JuggingStatus.start);
  console.log(pathLayer);
  return (
    <Layout $padding={'0'}>
      {status === JuggingStatus.start && (
        <StartCreateRoute
          numHearts={numHearts}
          addressText={currentAddress?.join(', ') || ''}
          onJuggingStart={() => {
            setStatus(JuggingStatus.jugging);
          }}
        />
      )}

      <MapView
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        defaultCoordinate={currentCoordinate}
        zoom={15}
        layers={allLayers}
      />
    </Layout>
  );
};

export default CreateRoutePage;
