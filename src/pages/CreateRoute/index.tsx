import { Layout } from '@components/layout';
import MapView from '@components/MapView';
import { useState } from 'react';
import StartCreateRoute from './StartCreateRoute';

export enum JuggingStatus {
  start = 'start',
  jugging = 'jugging',
  stop = 'stop',
  end = 'end',
}

const CreateRoutePage = () => {
  const [status, setStatus] = useState<JuggingStatus>(JuggingStatus.start);

  const handleStartJugging = () => {
    setStatus(JuggingStatus.jugging);
  };

  return (
    <Layout $padding={'0'}>
      {status === JuggingStatus.start && (
        <StartCreateRoute onJuggingStart={handleStartJugging} />
      )}

      <MapView
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        defaultCoordinate={{ latitude: 36.032, longitude: 129.365 }}
        zoom={15}
      />
    </Layout>
  );
};

export default CreateRoutePage;
