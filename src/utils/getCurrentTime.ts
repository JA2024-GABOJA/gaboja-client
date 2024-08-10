function getCurrentTime(minuteDelta = 0) {
	// 현재 시간에서 minuteDelta만큼 뺀 시간을 HH:MM AM(PM) format으로 반환한다.
	const now = new Date();
	now.setMinutes(now.getMinutes() - minuteDelta);

	let hours = now.getHours();
	const minutes = now.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	// 12시간 형식으로 변환
	hours = hours % 12;
	hours = hours ? hours : 12; // 0시는 12로 표시

	// 시간과 분을 두 자리 숫자로 포맷팅
	const hoursString = hours.toString().padStart(2, "0");
	const minutesString = minutes.toString().padStart(2, "0");

	return `${hoursString}:${minutesString} ${ampm}`;
}

export default getCurrentTime;
