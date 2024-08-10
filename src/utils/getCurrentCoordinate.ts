import { ICoordinate } from "../types";

function getCurrentCoordinate() {
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
      }
    );
  });
}

export { getCurrentCoordinate };
