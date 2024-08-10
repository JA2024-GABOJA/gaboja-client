import { default as MapBox } from 'react-map-gl';

interface MapProps {
    mapboxAccessToken: string;
    initialViewState: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    style: React.CSSProperties;
    mapStyle: string;
}


const Map = (props :  MapProps) => {
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    return (
        <MapBox
            mapboxAccessToken={token}
            initialViewState={
                props.initialViewState
            }
            style={props.style}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    )
}

export default Map;


