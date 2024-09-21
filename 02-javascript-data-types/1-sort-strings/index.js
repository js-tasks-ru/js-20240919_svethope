/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
function sortStrings(arr, param = 'asc') {
	const locales = ["ru-RU", "en-US"];
	const options = { sensitivity: "variant", caseFirst: "upper" };
	let collator = new Intl.Collator(locales, options);
	arr.sort((a, b) => collator.compare(a, b));
	if (param === 'desc') {
		arr.reverse();
	}
	return (arr);
}

