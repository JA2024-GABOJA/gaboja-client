import ArrowSVG from "@/assets/timeStreamArrow.svg?react";
import { MapView } from "@/components";
import { Layout } from "@/components/layout";
import { DEFAULT_COORDINATES } from "@/constants";
import { useCurrentPositionLayer } from "@/hooks";
import {
	convertCoordinatetoAddress,
	getCurrentCoordinate,
	getTodayString,
} from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function Make() {
	const { data: currentCoordinate, isLoading: isCoordinateLoading } = useQuery({
		queryKey: ["currentCoordinate"],
		queryFn: getCurrentCoordinate,
		initialData: {
			latitude: DEFAULT_COORDINATES[0],
			longitude: DEFAULT_COORDINATES[1],
		},
	});

	const { data: currentAddress, isLoading: isAddressLoading } = useQuery({
		queryKey: ["currentAddress", currentCoordinate],
		queryFn: () => convertCoordinatetoAddress(currentCoordinate),
	});

	const layers = useCurrentPositionLayer({
		latitude: currentCoordinate.latitude,
		longitude: currentCoordinate.longitude,
	});

	const loading = isCoordinateLoading || isAddressLoading;

	useEffect(() => {
		console.log(currentAddress);
	}, [currentAddress]);
	return (
		<Layout>
			{loading ? (
				<div>Loading...</div>
			) : (
				<MapView
					defaultCoordinate={{
						latitude: currentCoordinate.latitude,
						longitude: currentCoordinate.longitude,
					}}
					style={{
						width: "calc(100% - 52px)",
						height: "200px",
						marginLeft: "26px",
						marginRight: "26px",
						borderRadius: "10px",
					}}
					zoom={11}
					layers={layers}
				/>
			)}
			<Box w={"100%"} paddingX={"26px"}>
				<Text w="full" my={20} fontSize={18} fontWeight={400} color={"#717171"}>
					{getTodayString()}
				</Text>
				<Box w="full" h="80px">
					<ArrowSVG />
				</Box>
			</Box>
		</Layout>
	);
}

export default Make;
