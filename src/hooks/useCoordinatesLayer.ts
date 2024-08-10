import currentCoordinate from '@/assets/currentCoordinateGoing.svg?raw';
import destinationCoordinate from '@/assets/destinationCoordinate.svg?raw';
import targetCoordinate from '@/assets/targetCoordinate.svg?raw';
import { useModalState } from '@/store';
import type { IWalkingPathPoint } from '@/types';
import { type GeoJsonLayer, IconLayer } from '@deck.gl/layers';

interface IIconMap {
  current: string;
  destination: string;
  target: string;
}

const ICON_MAP = {
  current: encodeURIComponent(currentCoordinate),
  destination: encodeURIComponent(destinationCoordinate),
  target: encodeURIComponent(targetCoordinate),
};

export default function useCoordinatesLayer(coordinates: IWalkingPathPoint[]) {
  const { openModal } = useModalState();

  return new IconLayer({
    id: 'current-position',
    data: coordinates.map((coordinate) => ({
      position: [coordinate.longitude, coordinate.latitude],
      type: coordinate.type,
    })),
    getIcon: (coordinate) => ({
      url: `data:image/svg+xml;charset=utf-8,${
        ICON_MAP[coordinate.type as keyof IIconMap]
      }`,
      width: 400,
      height: 400,
    }),
    onClick: (e) => {
      const type = e.object.type as null | 'destination' | 'target';
      if (type === 'target' || type === 'destination') {
        openModal(type);
      }
    },
    sizeScale: 1,
    getSize: () => 50,
    getPosition: (d) => d.position,
    pickable: true,
  }) as unknown as GeoJsonLayer;
}
