import type { IWalkingPathInput, IWalkingPathPoint } from "@/types";
import { getPathString } from "@/utils";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useEffect, useState } from "react";

const useWalkingPathLayer = ({
	coordinates,
	walkingDurationSeconds,
}: IWalkingPathInput) => {
	const [loading, setLoading] = useState(false);
	const [routeLoading, setRouteLoading] = useState(false);
	const [layers, setRouteFeature] = useState<GeoJsonLayer[]>([]);
	const [walkingPathPoints, setWalkingPathPoints] = useState<
		IWalkingPathPoint[]
	>([]);

	const pathLoading = loading || routeLoading;

	const getWalkingPathPoints = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/findpath?current_latitude=${coordinates[0]}&current_longitude=${coordinates[1]}&walking_duration_seconds=${walkingDurationSeconds}`,
				{ method: "GET" },
			);

			if (!response.ok) {
				throw new Error("Failed to fetch walking path data");
			}

			const data: IWalkingPathPoint[] = await response.json();

			setWalkingPathPoints(data);
			setLoading(false);
		} catch (error) {
			throw new Error(`Failed to fetch walking path data: ${error}`);
		}
	};

	const getWalkingPath = async () => {
		if (walkingPathPoints.length === 0) return;
		try {
			const pathString = getPathString(walkingPathPoints);

			const response = await fetch(
				`https://api.mapbox.com/directions/v5/mapbox/walking/${pathString}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch route data");
			}
			const data = await response.json();
			setRouteLoading(false);
			setRouteFeature([
				new GeoJsonLayer({
					id: "route",
					data,
					stroked: true,
					filled: false,
					lineWidthMinPixels: 4,
					getLineColor: [255, 0, 255, 255],
				}),
			]);
		} catch (error) {
			throw new Error(`Failed to fetch route data: ${error}`);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setLoading(true);
		getWalkingPathPoints();
	}, [coordinates, walkingDurationSeconds, setLoading]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setRouteLoading(true);
		getWalkingPath();
	}, [walkingPathPoints, setRouteLoading]);

	return { pathLoading, walkingPathPoints, layers };
};

export default useWalkingPathLayer;
