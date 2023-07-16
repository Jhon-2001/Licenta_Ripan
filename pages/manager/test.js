import React from "react";

const test = () => {
	const powerset = (arr) => arr.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);
	var result = powerset([50, 65, 75, 80, 92]);
	// console.log(result);
	var canaleintermodulatii = powerset([50, 65, 75, 80, 92]).filter((x) => x.length > 1);

	canaleintermodulatii = [...new Set(canaleintermodulatii)];
	// console.log(canaleintermodulatii)
	// canaleintermodulatii = canaleintermodulatii.filter((x) => x.length <= +nrfreqinterm);

	for (let i = 0; i < canaleintermodulatii.length; i++) {
		// console.table(canaleintermodulatii[i])
	}

	function generateCombinations(array, index, currentResult, results) {
		if (index === array.length) {
			results.push(currentResult);
			return;
		}
		if (1) generateCombinations(array, index + 1, +currentResult + +array[index], results);
		generateCombinations(array, index + 1, +currentResult - +array[index], results);

		if (1) {
			generateCombinations(array, index + 1, +currentResult + +array[index] * 2, results);
			generateCombinations(array, index + 1, +currentResult - +array[index] * 2, results);
		}
	}
	var results = [];
	console.log(canaleintermodulatii[3]);
	generateCombinations(canaleintermodulatii[3], 0, "", results);
	console.log(results);

	for (var i = 0; i < results.length; i=i+4) {
		console.log("%cThis is colored text", "color: blue; font-weight: bold;",results[i], results[i + 1], results[i + 2], results[i + 3]);
	}
	return <div>test</div>;
};

export default test;
