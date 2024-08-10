import mbxClient from '@mapbox/mapbox-sdk/services/directions';

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const getDirections = mbxClient({
  accessToken,
});

export default getDirections;
