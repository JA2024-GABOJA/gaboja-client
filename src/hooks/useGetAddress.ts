import { ICoordinate } from '@/types';
import { convertCoordinatetoAddress } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const useGetAddress = ({ latitude, longitude }: ICoordinate) => {
  return useQuery({
    queryKey: ['currentAddress', latitude, longitude],
    queryFn: () =>
      convertCoordinatetoAddress({
        latitude,
        longitude,
      }),

    initialData: '',
  });
};

export default useGetAddress;
