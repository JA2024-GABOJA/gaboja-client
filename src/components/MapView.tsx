import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import { useEffect, useRef, useState } from "react";
import { Map as MapGL } from "react-map-gl";
import { useWalkingPath } from "../hooks";
const DEFAULT_COORDINATES: [number, number] = [36.013493, 129.349714];
const DEFAULT_DURATION_SECOND = 60 * 60 * 2;

const MapBox = () => {
	const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
	const geoControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
	const { pathLoading, walkingPathPoints, routeFeature } = useWalkingPath({
		coordinates: DEFAULT_COORDINATES,
		walkingDurationSeconds: DEFAULT_DURATION_SECOND,
	});
	const [layers, setLayers] = useState<GeoJsonLayer[]>([]);

	useEffect(() => {
		setLayers([
			new GeoJsonLayer({
				id: "route",
				data: routeFeature,
				stroked: true,
				filled: false,
				lineWidthMinPixels: 4,
				getLineColor: [255, 0, 255, 255],
			}),
		]);
	}, [routeFeature]);

	return (
		<DeckGL
			style={{ width: "600px", height: "400px" }}
			initialViewState={{
				latitude: DEFAULT_COORDINATES[0],
				longitude: DEFAULT_COORDINATES[1],
				zoom: 15,
			}}
			controller
			layers={layers}
		>
			<MapGL
				mapStyle={"mapbox://styles/mapbox/streets-v9"}
				mapboxAccessToken={token}
				attributionControl={false}
			/>
		</DeckGL>
	);
};

export default MapBox;
