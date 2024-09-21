/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
	let locales = ["ru", "en"];
	let options = { sensitivity: "variant", caseFirst: "upper" };
	let collator = new Intl.Collator(locales, options);
	let sortedArray = arr.slice();
	sortedArray.sort((a, b) => collator.compare(a, b));
	if (param === 'desc') { sortedArray.reverse(); }
	return (sortedArray);
}
