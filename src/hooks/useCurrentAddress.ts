import type { ICoordinate } from "@/types";
import { convertCoordinatetoAddress } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentAddress({
	currentCoordinate,
}: { currentCoordinate: ICoordinate }) {
	const { data: currentAddress, isLoading: isAddressLoading } = useQuery({
		queryKey: ["currentAddress", currentCoordinate],
		queryFn: () => convertCoordinatetoAddress(currentCoordinate),
	});

	return { currentAddress, isAddressLoading };
}
