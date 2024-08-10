import axiosInstance from './instance';
// 이런식으로 추가적인 API 요청 함수 만듭니다
export const getPath = axiosInstance.get('/path');
