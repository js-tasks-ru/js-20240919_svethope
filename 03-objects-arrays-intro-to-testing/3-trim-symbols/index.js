/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
	let mass = [];
	const letters = string.split('')
	let i = 0;
	let counter = 0;
	let prevLetter = letters[0];

	if (size === 0) return '';
	if (!size) return string;

	for (let letter of letters) {
		if (prevLetter === letter) {
			if (counter < size) {
				counter += 1;
				mass[i] = letter;
				i += 1;
			}
		}
		else {
			counter = 1;
			prevLetter = letter;
			mass[i] = letter;
			i += 1;
		}
	}
	return mass.join('');
}
