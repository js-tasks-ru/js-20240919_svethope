/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
	const newobj = {};
	for (let field in fields) {
		if (fields[field] in obj) {
			newobj[fields[field]] = obj[fields[field]];
		}
	}
	return newobj;
};
