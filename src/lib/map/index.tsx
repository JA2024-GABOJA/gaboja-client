import { useRef, useEffect, useState } from 'react';
import Map, { GeolocateControl, GeolocateResultEvent } from 'react-map-gl';
import getDirections from './mbx';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

interface MapProps {
  initialViewState: {
    longitude?: number;
    latitude?: number;
    zoom: number;
  };
  style: React.CSSProperties;

  onGeolocate?: (e: {
    coords: {
      latitude: number;
      longitude: number;
    };
  }) => void;
}

const MapBox = (props: MapProps) => {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const geoControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const [geo, setGeo] = useState<any | null>(null);
  const [layer, setLayer] = useState<GeoJsonLayer | null>(null);

  getDirections
    .getDirections({
      profile: 'walking',
      geometries: 'geojson',
      waypoints: [
        { coordinates: [129.284883, 35.825552] },
        { coordinates: [129.289668, 35.824615] },
      ],
    })
    .send()
    .then((response) => {
      const directions = response.body;
      console.log(directions.routes[0]);
      setGeo(directions.routes[0].geometry);
    });

  useEffect(() => {
    if (!geo) return;
    const _layer = new GeoJsonLayer({
      id: 'GeoJsonLayer',
      data: {
        type: 'Feature',
        ...geo,
      },
      filled: true,
      getLineColor: [160, 160, 160],
      getLineWidth: 6,
      getFillColor: [160, 160, 160, 200],
    });

    setLayer(_layer);
  }, []);

  return (
    <Map
      initialViewState={props.initialViewState}
      logoPosition={'bottom-right'}
      mapboxAccessToken={token}
      style={props.style}
      attributionControl={false}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <GeolocateControl
        ref={geoControlRef}
        onGeolocate={props.onGeolocate}
        trackUserLocation={true}
      />
      <DeckGL layers={[layer]} controller={true} />
    </Map>
  );
};

export default MapBox;
