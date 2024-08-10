import type { ICoordinate } from "../types";

async function getCurrentCoordinate() {
	return new Promise<ICoordinate>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			(error) => {
				reject(error);
			},
			{
				enableHighAccuracy: true,
				maximumAge: 0,
			},
		);
	});
}

export { getCurrentCoordinate };
