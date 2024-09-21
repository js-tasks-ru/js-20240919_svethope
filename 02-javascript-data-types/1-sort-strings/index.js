/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
function sortStrings(arr, param = 'asc') {
	arr.toLocaleString();
	let collator = new Intl.Collator({ sensitivity: "variant" }, { caseFirst: "upper" });
	arr.sort((a, b) => collator.compare(a, b));
	if (param === 'desc') {
		arr.reverse()
	}
	return (arr);
}
let arr = prompt("Massive, please: ").replace(/'/g, '"').split(', ');
let param = prompt("Method of sort: ");
alert(sortStrings(arr, param.toLocaleString()));
