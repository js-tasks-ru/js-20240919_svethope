/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
	const locales = ["ru", "en"];
	const options = { sensitivity: "variant", caseFirst: "upper" };
	const collator = new Intl.Collator(locales, options);
	const sortFn = param === 'desc' ? (a, b) => collator.compare(b, a) : (a, b) => collator.compare(a, b);
	return arr.slice().sort(sortFn);
}
