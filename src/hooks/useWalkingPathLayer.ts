import { GeoJsonLayer } from "@deck.gl/layers";
import { useEffect, useState } from "react";
import { DEFAULT_COORDINATES, DEFAULT_DURATION_SECOND } from "../constants";
import { useWalkingPath } from ".";

function useWalkingPathLayer() {
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

	return {
		pathLoading,
		layers,
	};
}

export default useWalkingPathLayer;
