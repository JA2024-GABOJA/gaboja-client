import { DEFAULT_COORDINATES } from "@/constants";
import { getCurrentCoordinate } from "@/utils";
import { useQuery } from "@tanstack/react-query";

console.log(getCurrentCoordinate);
export default function useCurrentCoordinate() {
	const { data: currentCoordinate, isLoading: isCoordinateLoading } = useQuery({
		queryKey: ["currentCoordinate"],
		// queryFn: getCurrentCoordinate,
		initialData: {
			latitude: DEFAULT_COORDINATES[0],
			longitude: DEFAULT_COORDINATES[1],
		},
	});

	return {
		currentCoordinate,
		isCoordinateLoading,
	};
}
