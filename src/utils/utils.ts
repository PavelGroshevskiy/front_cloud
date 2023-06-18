const calculateProgressBarWidth = (finishedStepsCount: number) => {
	switch (finishedStepsCount) {
		case 1:
			return 0;
		case 2:
			return 50;
		case 3:
			return 100;
		default:
			return `Invalid finishedStepsCount: ${finishedStepsCount}`;
	}
};

export const myPhone = "+7 950 262-41-25";
export const myEmail = "pavel.groshevskiy@gmail.com";

export const myLinks = [
	{ name: "Telegram", url: "https://t.me/Pavel_Groshevskiy" },
	{ name: "GitHub", url: "https://github.com/PavelGroshevskiy" },
	{ name: "Resume", url: "https://portfolio-six-blue-78.vercel.app/" },
];

export const getTrueKeysCheckBoxes = (checkBoxes: Record<number, boolean>): number[] =>
	Object.keys(checkBoxes).reduce<number[]>((acc, key) => {
		const numericKey = parseInt(key);
		if (checkBoxes[numericKey]) {
			acc.push(numericKey);
		}
		return acc;
	}, []);

export default calculateProgressBarWidth;
