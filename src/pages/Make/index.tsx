import ArrowSVG from "@/assets/timeStreamArrow.svg?react";
import { MapView } from "@/components";
import { Layout } from "@/components/layout";
import { DEFAULT_COORDINATES } from "@/constants";
import { useCurrentPositionLayer } from "@/hooks";
import {
	convertCoordinatetoAddress,
	getCurrentCoordinate,
	getCurrentTime,
	getTodayString,
} from "@/utils";
import {
	Box,
	Button,
	Center,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Spacer,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";

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

	const [timeDeltaMinutes, setTimeDeltaMinutes] = useState(0);

	const loading = isCoordinateLoading || isAddressLoading;

	return (
		<Layout>
			{loading ? (
				<Box minH="200px" bg="#b3b3b3" />
			) : (
				<MapView
					defaultCoordinate={{
						latitude: currentCoordinate.latitude,
						longitude: currentCoordinate.longitude,
					}}
					style={{
						width: "100%",
						height: "200px",
						borderRadius: "10px",
						border: "1px #434343",
					}}
					zoom={11}
					layers={layers}
				/>
			)}
			<Box w={"100%"}>
				<Text
					w="full"
					my={"20px"}
					fontSize={18}
					fontWeight={400}
					color={"#717171"}
				>
					{getTodayString()}
				</Text>
				<Flex h="80px" gap={3}>
					<Flex flexDir="column" gap={9} minW={"92px"}>
						<Text fontSize={20} fontWeight={700}>
							{getCurrentTime()}
						</Text>
						<Text fontSize={20} fontWeight={700}>
							{getCurrentTime(timeDeltaMinutes)}
						</Text>
					</Flex>
					<ArrowSVG />
					<Flex flexDir="column" gap={4} ml={1}>
						{currentAddress && (
							<>
								<Box>
									<Text fontSize={20} fontWeight={700} mb={0.5}>
										{currentAddress[0]}
									</Text>
									<Text fontSize={16} color={"#717171"} fontWeight={700}>
										{currentAddress[1]}
									</Text>
								</Box>
								<Box>
									<Text fontSize={20} fontWeight={700} mb={0.5}>
										{currentAddress[0]}
									</Text>
									<Text fontSize={16} color={"#717171"} fontWeight={700}>
										{currentAddress[1]}
									</Text>
								</Box>
							</>
						)}
					</Flex>
				</Flex>
			</Box>

			<BottomSheet
				timeDeltaMinutes={timeDeltaMinutes}
				setTimeDeltaMinutes={setTimeDeltaMinutes}
			/>
		</Layout>
	);
}

interface IBottomSheetProps {
	timeDeltaMinutes: number;
	setTimeDeltaMinutes: (value: number) => void;
}

function BottomSheet({
	timeDeltaMinutes,
	setTimeDeltaMinutes,
}: IBottomSheetProps) {
	const handleChange = (value: number) => {
		setTimeDeltaMinutes(value);
	};

	const formatTime = (minutes: number) => {
		return {
			0: "0m",
			15: "15m",
			30: "30m",
			45: "45m",
			60: "1h",
			75: "1h 15m",
			90: "1h 30m",
			105: "1h 45m",
			120: "2h",
		}[minutes];
	};
	return (
		<Flex
			flexDir={"column"}
			position="absolute"
			bottom={0}
			left={0}
			bg={"#3176B1"}
			w={"100%"}
			h={"320px"}
			borderTopRadius={20}
			boxShadow={"0px -4px 15.4px 0px rgba(0, 0, 0, 0.20)"}
			p={"24px"}
		>
			<Center gap={2}>
				<IoAlertCircleSharp color="white" size={20} />
				<Text color={"white"} fontSize={"20px"} fontWeight={500}>
					How long should we walkd today?
				</Text>
			</Center>
			<Spacer />
			<Box pt={4} pb={2} w="100%" mb={"72px"} px={4}>
				<Slider
					aria-label="time-slider"
					defaultValue={0}
					min={0}
					max={120}
					step={15}
					onChange={handleChange}
				>
					{[0, 15, 30, 45, 60, 75, 90, 105, 120].map((value) => (
						<SliderMark
							key={value}
							value={value}
							mt={4}
							fontSize="sm"
							color="white"
							fontWeight={400}
						>
							<Center flexDir={"column"} gap={2} my={2}>
								<Center
									bg="white"
									w={value % 10 ? "1.5px" : "3px"}
									h={value % 10 ? "8px" : "13px"}
									borderRadius={10}
									textAlign={"center"}
								/>
							</Center>
						</SliderMark>
					))}
					{[0, 15, 30, 45, 60, 75, 90, 105, 120].map((value) => (
						<SliderMark
							as={Center}
							key={value}
							value={value}
							ml={-2.5}
							mt={12}
							fontSize="sm"
							color="white"
							fontWeight={400}
						>
							{value % 10 ? "" : formatTime(value)}
						</SliderMark>
					))}
					<SliderTrack height={3} borderRadius={10} bg="white">
						<SliderFilledTrack bg="#FFBC2F" />
					</SliderTrack>
					<Tooltip
						hasArrow
						bg="#353535"
						color="white"
						placement="top"
						isOpen={true}
						label={formatTime(timeDeltaMinutes)}
						fontSize={"18px"}
						fontWeight={700}
						paddingX={"16px"}
						paddingY={"10px"}
						borderRadius={10}
						offset={[0, 15]}
					>
						<SliderThumb
							// ml={"-12px"}
							bg="#FFBC2F"
							boxSize={"24px"}
							border={"4px solid rgba(203, 203, 203, 0.71)"}
						/>
					</Tooltip>
				</Slider>
			</Box>

			<Button
				bg={"#E56447"}
				color={"white"}
				borderRadius={"41px"}
				w="full"
				h={"76px"}
				paddingX={"80px"}
				paddingY={"28px"}
				lineHeight={"20px"}
				fontWeight={800}
				fontSize={"26px"}
				boxShadow={"0px 4px 10px 0px rgba(0, 0, 0, 0.25)"}
			>
				Make my walking path
			</Button>
		</Flex>
	);
}

export default Make;
