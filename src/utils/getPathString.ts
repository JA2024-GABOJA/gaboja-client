import type { IWalkingPathPoint } from "../types";

function getPathString(points: IWalkingPathPoint[]): string {
	return points
		.map((point) => `${point.longitude},${point.latitude}`)
		.join(";");
}

export default getPathString;
