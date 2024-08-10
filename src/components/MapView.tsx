import { Box } from "@chakra-ui/react";
import type { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import { Map as MapGL } from "react-map-gl";
import type { ICoordinate } from "../types";

interface IMapBoxProps {
	defaultCoordinate: ICoordinate;
	style: Partial<CSSStyleDeclaration>;
	zoom: number;
	layers?: GeoJsonLayer[];
}

function MapView({
	defaultCoordinate: { latitude, longitude },
	style,
	zoom,
	layers = [],
}: IMapBoxProps) {
	return (
		<Box
			width={style.width}
			height={style.height}
			borderRadius={style.borderRadius}
			overflow={"hidden"}
			minH={"200px"}
		>
			<DeckGL
				style={{ width: "100%", height: "100%", position: "relative" }}
				layers={layers}
				initialViewState={{
					latitude,
					longitude,
					zoom,
				}}
				controller
			>
				<MapGL
					mapStyle={"mapbox://styles/mapbox/streets-v9"}
					mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
					attributionControl={false}
				/>
			</DeckGL>
		</Box>
	);
}

export default MapView;
