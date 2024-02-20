let lastTimestamp = null;
let counter = 0;

const generateUniqueId = () => {
	const now = Date.now();
	if (now === lastTimestamp) {
		counter += 1;
	} else {
		counter = 0;
		lastTimestamp = now;
	}
	return `${now}-${counter}`;
};

export default generateUniqueId;
