import type { ICoordinate } from "../types";

const ENDPOINT = "https://api.mapbox.com/search/geocode/v6/reverse";

async function convertCoordinatetoAddress(coordinate: ICoordinate) {
	const response = await fetch(
		`${ENDPOINT}?longitude=${coordinate.longitude}&latitude=${coordinate.latitude}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`,
	);
	const data = await response.json();
	const address: string = data.features[0].properties.full_address;
	const addresses = address.split(",");
	return [addresses[0], addresses.slice(1, -2).join(",")];
}

export default convertCoordinatetoAddress;
