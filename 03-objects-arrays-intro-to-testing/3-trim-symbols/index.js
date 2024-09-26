/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
	let mass = [];
	const letters = string.split('');
	let counter = 1;
	let prevLetter = letters[0];
	if (size === 0) return '';
	if (!size) return string;

	for (let i = 1; i < letters.length; i++) {
		if (prevLetter == letters[i]) {
			if (counter >= size) {
				letters[i] = '';
				counter += 1;
				continue;
			}
		}
		else {
			counter = 0;
			prevLetter = letters[i]
		}
		counter += 1;
	}
	return letters.join('');
}
