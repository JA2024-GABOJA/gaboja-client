interface IBaseWalkingPathPoint {
	latitude: number;
	longitude: number;
}

interface ICurrentOrTargetPoint extends IBaseWalkingPathPoint {
	type: "current" | "target";
}

interface IDestinationPoint extends IBaseWalkingPathPoint {
	type: "destination";
	name: string;
	address: string;
}

type IWalkingPathPoint = ICurrentOrTargetPoint | IDestinationPoint;

export type { IBaseWalkingPathPoint, IWalkingPathPoint };
