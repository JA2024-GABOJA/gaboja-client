interface IBaseWalkingPathPoint {
	latitude: number;
	longitude: number;
}

interface ICurrentPoint extends IBaseWalkingPathPoint {
	type: "current";
}

interface ITargetPoint extends IBaseWalkingPathPoint {
	type: "target";
	id: number;
}

interface IDestinationPoint extends IBaseWalkingPathPoint {
	type: "destination";
	name: string;
	address: string;
}

type IWalkingPathPoint = ITargetPoint | ICurrentPoint | IDestinationPoint;

export type { IBaseWalkingPathPoint, IWalkingPathPoint };
