import { useEffect, useState } from 'react';

const useGeo = () => {
  const [geo, setGeo] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setGeo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => console.error(error)
    );
  }, []);

  console.log(geo?.latitude, geo?.longitude);

  return geo;
};

export default useGeo;
