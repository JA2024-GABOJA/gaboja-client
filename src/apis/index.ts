import axiosInstance from './instance';
// 이런식으로 추가적인 API 요청 함수 만듭니다

const path = 'http://webviewer.mobiltech.io:18084/poviewer/GetPoiImageData';

export const getPOIImage = async (poiId: number) => {
  return axiosInstance.post(path, { poi_id: poiId });
};
