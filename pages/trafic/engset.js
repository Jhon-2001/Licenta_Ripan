import React, { useState, useEffect } from "react";
import SubmenuTrafic from "../../components/SubmenuTrafic";

const ErlangB = () => {
	const initialState = {
		erlang: 0,
		pblock: 0,
		abonat1: 0,

		pblock2: 0,
		circuite: 0,
		abonat2: 0,

		trafic3: 0,
		circuite3: 0,
		abonat3: 0,
	};

	const [showform, setShowform] = useState({ b1: false, b2: false, b3: false });
	const [data, setData] = useState(initialState);
	const [result, setResult] = useState(0);
	const [result2, setResult2] = useState(0);
	const [result3, setResult3] = useState(0);

	const { erlang, pblock, circuite, pblock2, trafic3, circuite3, abonat1, abonat2, abonat3 } = data;
	// const { circuite, pblock2 } = data2;

	useEffect(() => {
		var state = engset_circuite(data.erlang, data.pblock, data.abonat1);
		setResult(state);
	}, [data.erlang, data.pblock, data.abonat]);

	useEffect(() => {
		var state2 = engset_traffic(data.circuite, data.pblock2, data.abonat2);
		setResult2(state2);
	}, [data.pblock2, data.circuite, data.abonat2]);

	useEffect(() => {
		var state3 = engset_block(data.circuite3, data.trafic3, data.abonat3);
		setResult3(state3);
	}, [data.trafic3, data.circuite3, data.abonat3]);

	const handleChangeInput = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData({ ...data, [name]: +value });
		console.log(data);
	};
	function newton(n, k) {
		if (k === 0 || k === n) {
			return 1;
		} else {
			return (n / k) * newton(n - 1, k - 1);
		}
	}
	function precision(number, prec) {
		return parseFloat(number.toFixed(prec));
	}

	function basic_engset(lines, traffic, Pb, sources) {
		/*
		:return: blocking rate when you know blocking rate
		Used in loops when looking for another params
		*/
		const a = traffic / (sources - traffic * (1 - Pb));
		const l = newton(sources - 1, lines) * Math.pow(a, lines);
		let sum = 0;

		for (let i = 0; i < lines; i++) {
			sum += newton(sources - 1, i) * Math.pow(a, i);
		}
		return l / sum;
	}

	function engset_circuite(traffic, block, sources) {
		if (traffic && block && sources) {
			/*
		:param traffic: the traffic in Erlangs
		:param block: blocking rate
		:param sources: the number of points generating the traffic
		:return: number of servers
		*/
			var lines = 1;
			let p_search = basic_engset(lines, traffic, block, sources);
			while (p_search >= block) {
				lines++;
				p_search = basic_engset(lines, traffic, block, sources);
			}
		}
		console.log(lines);
		return lines - 1;
	}

	//===================================================================

	function engset_traffic(lines, block, sources) {
		if (lines && block && sources) {
			var traffic = 0;
			var p_search = basic_engset(lines, traffic, block, sources);

			while (p_search <= block) {
				traffic += 0.1;
				p_search = basic_engset(lines, traffic, block, sources);
			}
		}
		return traffic; // returns the traffic in Erlangs
	}

	//============================================================================
	function engset_block(lines, traffic, sources) {
		if (lines && traffic < 100 && sources && traffic < sources ) {
			var block = 0;
			var right = basic_engset(lines, traffic, block, sources);

			while (block != right) {
				block += 0.0001;
				right = precision(right, 4);
				block = precision(block, 4);
			}
		}
		return block; // returns the blocking rate
	}

	return (
		<div>
			{" "}
			<SubmenuTrafic />
			<div className="md:w-3/5 mx-2 md:mx-auto">
				<h1 className="text-2xl text-center mt-2 font-bold border-b-2 border-gray-500 pb-1 ">
					Engset Calculator{" "}
				</h1>
				<div className="flex border-b-2 pb-2  border-gray-500 justify-evenly mt-2 items-center">
					<button
						onClick={() => {
							setShowform({ b1: true, b2: false, b3: false });
							console.log(showform);
						}}
						className="bg-[#5dbea3] border-2 border-green-900 rounded-md px-2 py-1 text-md font-bold text-green-900"
					>
						Numar de circuite
					</button>
					<button
						onClick={() => {
							setShowform({ b1: false, b2: true, b3: false });
							console.log(showform);
						}}
						className="bg-[#5dbea3] border-2 border-green-900 rounded-md px-2 py-1 text-md font-bold text-green-900"
					>
						Trafic
					</button>
					<button
						onClick={() => {
							setShowform({ b1: false, b2: false, b3: true });
							console.log(showform);
						}}
						className="bg-[#5dbea3] border-2 border-green-900 rounded-md px-2 py-1 text-md font-bold text-green-900"
					>
						<span className="md:hidden ">P. de blocare</span>
						<span className="hidden md:block">Probabilitate de blocare</span>
					</button>
				</div>
				{!showform.b1 && !showform.b2 && !showform.b3 && (
					<div className="text-xl text-center ">
						Selecteaza din lista de mai sus ce doresti a se calula ⬆️!
					</div>
				)}
				{showform.b1 == 1 ? (
					<div>
						{" "}
						<h2 className="mt-2">
							<p className="md:block hidden">
								{" "}
								Date intrare :{" "}
								<span className="font-bold bg-gray-200 rounded-md px-1 text-green-700">
									Traffic ( Erlang )
								</span>{" "}
								si{" "}
								<span className="font-bold  bg-gray-200 rounded-md  text-green-700">
									Probabilitate de blocate ( % sau zecimal )
								</span>
							</p>
							Date iesire :
							<span className="text-red-500 font-bold bg-gray-200 rounded-md ">
								{" "}
								Numar de circuite / linii
							</span>
						</h2>
						<div class="max-w-xl border-2 mt-2 bg-[#a9b7d2] border-gray-500  rounded-md ">
							<form class=" shadow-md rounded p-3">
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Numar Abonati
									</label>
									<input
										class="shadow ring-2 ring-green-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex : 50 Abonati"
										onChange={handleChangeInput}
										value={abonat1 < 0 ? abonat1 : null}
										name="abonat1"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Traffic ( Erlang )
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex: 25 E"
										onChange={handleChangeInput}
										value={erlang < 0 ? erlang : null}
										name="erlang"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input2">
										Probabilitate de blocate ( % sau zecimal )
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input2"
										type="number"
										placeholder="Ex: 10% sau 0.1"
										onChange={handleChangeInput}
										name="pblock"
										value={pblock < 0 ? pblock : null}
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="output">
										Rezultat ( circuite )
									</label>
									<output
										class="shadow  w-40 appearance-none border font-bold text-md bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="output"
										value={result > 0 ? result : "Rezultat"}
									>
										{result > 0 && data.erlang != 0 && data.pblock != 0
											? result + " Circuite "
											: "-> ... circuite"}
									</output>
								</div>
								<div class="flex items-center justify-between"></div>
							</form>
						</div>
					</div>
				) : null}

				{/* ======================================================================== */}
				{showform.b2 == 1 ? (
					<div>
						{" "}
						<h2 className="mt-2">
							<p className="md:block hidden">
								Date intrare :{" "}
								<span className="font-bold bg-gray-200 rounded-md px-1 text-green-700">
									Numar de circuite
								</span>{" "}
								si{" "}
								<span className="font-bold bg-gray-200 rounded-md text-green-700">
									Probabilitate de blocate ( % sau zecimal )
								</span>
							</p>
							Date iesire :
							<span className="text-red-500 px-1 bg-gray-200 rounded-md  font-bold">
								{" "}
								Traffic ( Erlang )
							</span>
						</h2>
						<div class="max-w-xl border-2 bg-[#a9b7d2] mt-2 border-gray-500  rounded-md ">
							<form class=" shadow-md rounded p-3">
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Numar Abonati
									</label>
									<input
										class="shadow ring-2 ring-green-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex: 25 E"
										onChange={handleChangeInput}
										value={abonat2 < 0 ? abonat2 : null}
										name="abonat2"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Numar de circuite / linii
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex: 36 Circuite"
										onChange={handleChangeInput}
										value={circuite < 0 ? circuite : null}
										name="circuite"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input2">
										Probabilitate de blocate ( % sau zecimal )
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input2"
										type="number"
										placeholder="Ex: 10% sau 0.1"
										onChange={handleChangeInput}
										name="pblock2"
										value={pblock2 < 0 ? pblock2 : null}
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="output">
										Rezultat ( erlang )
									</label>
									<output
										class="shadow  w-40 appearance-none border font-bold text-md bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="output"
									>
										{result2 > 0 && data.pblock2 != 0 && data.circuite != 0
											? result2.toFixed(3) + " Erlang "
											: "-> ... erlang"}
									</output>
								</div>
								<div class="flex items-center justify-between"></div>
							</form>
						</div>
					</div>
				) : null}

				{/* ======================================================================== */}
				{showform.b3 == 1 ? (
					<div>
						{" "}
						<h2 className="mt-2">
							<p className="md:block hidden">
								Date intrare :{" "}
								<span className="font-bold bg-gray-200 rounded-md px-1 text-green-700">
									Numar de circuite / linii
								</span>{" "}
								si{" "}
								<span className="font-bold px-1 bg-gray-200 rounded-md text-green-700">
									Traffic ( Erlang )
								</span>
							</p>
							Date iesire :
							<span className="text-red-500 px-1 bg-gray-200 rounded-md  font-bold">
								{" "}
								Probabilitate de blocate ( % sau zecimal )
							</span>
						</h2>
						<div class="max-w-xl border-2 bg-[#a9b7d2] mt-2 border-gray-500  rounded-md ">
							<form class=" shadow-md rounded p-3">
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Numar Abonati
									</label>
									<input
										class="shadow ring-2 ring-green-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex: 25 E"
										onChange={handleChangeInput}
										value={abonat3 < 0 ? abonat3 : null}
										name="abonat3"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input1">
										Trafic ( Erlang )
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input1"
										type="number"
										placeholder="Ex: 25 Erlang"
										onChange={handleChangeInput}
										value={trafic3 < 0 ? trafic3 : null}
										name="trafic3"
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="input2">
										Numar circuite / linii
									</label>
									<input
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="input2"
										type="number"
										placeholder="Ex: 10% sau 0.1"
										onChange={handleChangeInput}
										name="circuite3"
										value={circuite3 < 0 ? circuite3 : null}
									></input>
								</div>
								<div class="mb-4">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="output">
										Rezultat ( % / zecimal )
									</label>
									<output
										class="shadow  w-40 appearance-none border font-bold text-md bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="output"
									>
										{result3 > 0 && data.trafic3 != 0 && data.circuite3 != 0
											? result3.toFixed(3) * 100 + " %"
											: "-> ... erlang"}
									</output>
									<span class="px-2 font-bold">sau</span>
									<output
										class="shadow  w-40 appearance-none border font-bold text-md bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="output"
									>
										{result3 > 0 && data.trafic3 != 0 && data.circuite3 != 0
											? result3.toFixed(3) + "  "
											: "-> ... erlang"}
									</output>
								</div>
								<div class="flex items-center justify-between"></div>
							</form>
						</div>{" "}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ErlangB;
