import currentCoordinate from '@/assets/currentCoordinate.svg?raw';
import { type GeoJsonLayer, IconLayer } from '@deck.gl/layers';
import type { ICoordinate } from '../types';

function useCurrentPositionLayer(coordinates: ICoordinate) {
  return [
    new IconLayer({
      id: 'current-position',
      data: [{ position: [coordinates.longitude, coordinates.latitude] }],
      getIcon: () => ({
        url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          currentCoordinate
        )}`,
        width: 400,
        height: 400,
      }),
      // getIcon: (d) => "marker",
      sizeScale: 1,
      getSize: () => 40,
      getPosition: (d) => d.position,
      pickable: true,
    }) as unknown as GeoJsonLayer,
  ];
}

export default useCurrentPositionLayer;
