/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  arr.toLocaleString();
  	let collator = new Intl.Collator({ sensitivity: "variant" }, { caseFirst: "upper" });
  	arr.sort((a, b) => collator.compare(a, b));
  	if (param === 'desc') {
  		let collator = new Intl.Collator({ sensitivity: "variant" }, { caseFirst: "lower" });
  		arr.sort((a, b) => collator.compare(b, a));
}
