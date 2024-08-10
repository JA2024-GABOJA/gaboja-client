import { IconLayer } from "@deck.gl/layers";
import type { ICoordinate } from "../types";

function useCurrentPositionLayer(coordinates: ICoordinate) {
	return [
		new IconLayer({
			id: "current-position",
			data: [{ position: [coordinates.longitude, coordinates.latitude] }],
			iconAtlas:
				"https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
			iconMapping: {
				marker: {
					x: 0,
					y: 0,
					width: 128,
					height: 128,
					mask: true,
				},
			},
			getIcon: (d) => "marker",
			getPosition: (d) => d.position,
			getSize: 40,
			getColor: [0, 0, 255],
			sizeScale: 1,
			pickable: true,
		}) as IconLayer,
	];
}

export default useCurrentPositionLayer;
