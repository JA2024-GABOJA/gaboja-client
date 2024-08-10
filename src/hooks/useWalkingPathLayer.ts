import type { IWalkingPathPoint } from "@/types";
import { getPathString } from "@/utils";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface IUseWalkingPathLayer {
	walkingPathPoints: IWalkingPathPoint[];
}

export default function useWalkingPathLayer({
	walkingPathPoints,
}: IUseWalkingPathLayer) {
	const pathString = useMemo(
		() => getPathString(walkingPathPoints),
		[walkingPathPoints],
	);

	const { data, isLoading } = useQuery({
		queryKey: ["walkingPath", pathString],
		queryFn: async () => {
			const response = await fetch(
				`https://api.mapbox.com/directions/v5/mapbox/walking/${pathString}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch route data");
			}
			return response.json();
		},
	});

	const layers = useMemo(() => {
		if (!data) return [];
		return [
			new GeoJsonLayer({
				id: "route",
				data: {
					type: "GeometryCollection",
					geometries: [data.routes[0].geometry],
				},
				stroked: true,
				filled: false,
				lineWidthMinPixels: 4,
				getLineColor: [255, 0, 0, 255],
			}),
		];
	}, [data]);

	return {
		layers,
		pathLoading: isLoading,
	};
}
