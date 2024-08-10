function getTodayString(): string {
	const today = new Date();
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
	};
	return today.toLocaleDateString("en-US", options).replace(/,/g, "");
}

export default getTodayString;
