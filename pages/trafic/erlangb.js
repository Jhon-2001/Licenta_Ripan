import React, { useState, useEffect } from "react";
import SubmenuTrafic from "../../components/SubmenuTrafic";

const ErlangB = () => {
	const initialState = {
		erlang: 0,
		pblock: 0,

		pblock2: 0,
		circuite: 0,

		trafic3: 0,
		circuite3: 0,
	};

	const [showform, setShowform] = useState({ b1: false, b2: false, b3: false });
	const [data, setData] = useState(initialState);
	const [result, setResult] = useState(0);
	const [result2, setResult2] = useState(0);
	const [result3, setResult3] = useState(0);

	const { erlang, pblock, circuite, pblock2, trafic3, circuite3 } = data;
	// const { circuite, pblock2 } = data2;

	useEffect(() => {
		var state = calculateCircuits(data.erlang, data.pblock);
		setResult(state);
	}, [data.erlang, data.pblock]);

	useEffect(() => {
		var state2 = calculateTraffic(data.circuite, data.pblock2);
		setResult2(state2);
		console.log(result2);
	}, [data.pblock2, data.circuite]);

	useEffect(() => {
		var state3 = blokprob(data.circuite3, data.trafic3);
		setResult3(state3);
	}, [data.trafic3, data.circuite3]);

	const handleChangeInput = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData({ ...data, [name]: +value });
		console.log(data);
	};

	function erlangB(A, N) {
		let sum = 0;
		for (let i = 0; i <= N; i++) {
			sum += Math.pow(A, i) / factorial(i);
		}
		return Math.pow(A, N) / (factorial(N) * sum);
	}

	function factorial(n) {
		if (n === 0 || n === 1) {
			return 1;
		}
		return n * factorial(n - 1);
	} //==================================================================================

	function blokprob(Atraf, Nch) {
		var blokking;
		var pi0 = 0;
		var aux1 = Atraf;
		var aux2 = 1;
		var out;

		for (let i = 0; i <= Nch; i++) {
			out = aux2;
			pi0 = pi0 + aux2;
			if (i > 0) {
				aux2 = aux2 / (i + 1);
			}
			aux2 = aux2 * aux1;
		}
		blokking = out / pi0;

		return blokking;
	}

	function calculateTraffic(NC, blok) {
		var Nchan = NC;
		var block = blok * 100;
		var Amax = (100 * Nchan) / (100 - block);
		var Amin = 0;
		var criterion = Amax;
		var test;
		var A;

		// if (block <= 0) alert(" Error: enter a positive blocking probability");
		// if (block >= 100) alert(" Error: enter blocking probability less than 100%");
		// if (block < 1)
		// 	alert(
		// 		" Warning: Make sure that you express \n         the blocking probability in percent (0..100%)\n Blocking probabilities less than 1% are not so common."
		// 	);

		while (criterion > 0.0001) {
			A = (Amax + Amin) / 2;
			test = 100 * blokprob(A, Nchan);
			if (test > block) {
				Amax = A;
			} else {
				Amin = A;
			}
			criterion = Amax - Amin;

			// console.log(A);
		}
		return A;
	}

	//=============================================================================
	function calculateCircuits(traffic, desiredBlockingProb) {
		let N = 1; // initial value for number of circuits
		let Pb = 1; // initial value for blocking probability

		while (Pb > desiredBlockingProb) {
			Pb = erlangB(traffic, N);
			N++;
		}

		return N - 1; // return the last value of N that produced a blocking probability less than or equal to the desired value
	}
	

	return (
		<div>
			{" "}
			<SubmenuTrafic />
			<div className="md:w-3/5 mx-2 md:mx-auto">
				<h1 className="text-2xl text-center mt-2 font-bold border-b-2 border-gray-500 pb-1 ">
					Erlang B Calculator{" "}
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
								Numar de circuite
							</span>
						</h2>
						<div class="max-w-xl border-2 mt-2 bg-[#a9b7d2] border-gray-500  rounded-md ">
							<form class=" shadow-md rounded p-3">
								
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
										Numar de circuite
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
									Numar de circuite
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
										Numar circuite
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
