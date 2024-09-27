/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
	let counter = 1;
	let string1 = string.substring(0, 1);
	let prevLetter = string[0];

	if (size === 0) return '';
	if (!size) return string;

	for (let i = 1; i < string.length; i++) {
if (prevLetter == string[i]) {
			if (counter < size) {
				string1 = string1 + string[i];
			}
		}
		else {
			counter = 0;
			prevLetter = string[i]
			string1 = string1 + string[i];
		}
		counter += 1;
	}

	return string1;
}