/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path, obj) {
	const pathStr = path.split('.');

	if (!pathStr.length) return undefined;

	return (obj) => {
		let result = obj;

		for (const pstr of pathStr) {
			if (result[pstr] === undefined) return undefined;
			if (result[pstr] === '') return null;
			if (!result.hasOwnProperty(pstr)) return;

			result = result[pstr];
		}
		return result;
	};
	}
