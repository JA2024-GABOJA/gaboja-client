import type { ICoordinate, IWalkingPathPoint } from "@/types";
import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "https://junctionhack.site/findRoutes";

interface IUseWalkingPathPoints {
	currentCoordinate: ICoordinate;
	walkingDurationSeconds: number;
}

export default function useWalkingPathPoints({
	currentCoordinate,
	walkingDurationSeconds,
}: IUseWalkingPathPoints) {
	const { data, isLoading } = useQuery<IWalkingPathPoint[]>({
		queryKey: ["walkingPathPoints"],
		queryFn: async () => {
			const response = await fetch(
				`${ENDPOINT}?longitude=${currentCoordinate.longitude}&latitude=${currentCoordinate.latitude}&duration=${walkingDurationSeconds}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch walking path data");
			}
			return response.json();
		},
	});

	return { walkingPathPoints: data, pathLoading: isLoading };
}
