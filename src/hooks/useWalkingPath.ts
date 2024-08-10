import type { GeometryCollection } from "geojson";
import { useEffect, useState } from "react";
import type { IWalkingPathInput, IWalkingPathPoint } from "../types";
import { getPathString } from "../utils";

const useWalkingPath = (props: IWalkingPathInput) => {
	const { coordinates, walkingDurationSeconds } = props;
	const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeFeature, setRouteFeature] = useState<GeometryCollection>({
    type: "GeometryCollection",
    geometries: [],
  });
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
      setRouteFeature({...routeFeature, geometries: [data.routes[0].geometry]});
      }
      catch (error) {
        throw new Error(`Failed to fetch route data: ${error}`);
      }
    };

	useEffect(() => {
		setLoading(true);
		getWalkingPathPoints();
	}, [coordinates, walkingDurationSeconds, setLoading]);

  useEffect(() => {
    setRouteLoading(true);
    getWalkingPath();
  }, [walkingPathPoints, setRouteLoading]);
    
  return { pathLoading, walkingPathPoints, routeFeature };
};

export default useWalkingPath;
