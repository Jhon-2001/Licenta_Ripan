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
		// var state = calculateCircuits(data.erlang, data.pblock);
		// setResult(state);
	}, [data.erlang, data.pblock]);

	useEffect(() => {
		// var state2 = calculateTraffic(data.circuite, data.pblock2);
		// setResult2(state2);
		// console.log(result2);
	}, [data.pblock2, data.circuite]);

	useEffect(() => {
		var state3 = calculate_P_T(data.circuite3, data.trafic3,1);
		setResult3(state3);
	}, [data.trafic3, data.circuite3]);

	const handleChangeInput = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData({ ...data, [name]: +value });
		console.log(data);
	};

	function erlangC_pBlock(N,A) {
		var up = (Math.pow(A, N) / factorial(N)) * (N / (N - A));
		var sum = 0;
		for (let i = 0; i < N; i++) {
			sum = sum + (Math.pow(A, i) / factorial(i));
		}
		var down = (Math.pow(A, N) / factorial(N)) * (N / (N - A));
		var P = up / (sum + down);

		return P;
	}


	function factorial(n) {
		if (n <= 1) {
			return 1;
		} else {
			return n * factorial(n - 1);
		}
	}
//===============================================================================



const lambda = 50;
const mu = 64;
const A = lambda / mu;

const N = 1;

const P_0 = calculate_P_0(lambda, mu, N);
console.log(`P_0 = ${P_0}`);

const P_T = calculate_P_T(lambda, mu, N);
console.log(`P_T = ${P_T}`);

const E_W = calculate_E_W(lambda, mu, N);
console.log(`E_W = ${E_W}`);

const E_T = calculate_E_T(lambda, mu, N);
console.log(`E_T = ${E_T}`);

const E_N = calculate_E_N(lambda, mu, N);
console.log(`E_N = ${E_N}`);

const E_m = calculate_E_m(lambda, mu, N);
console.log(`E_M = ${E_m}`);


function calculate_P_0(lambda, mu, N) {
    // Calculate P_0 (probability of an empty system)
    
    // Calculate probability of the system being empty
    let P_0 = 1 / (1 - lambda / (mu * N)) * Math.pow(lambda / mu, N) / factorial(N);
    for (let i = 0; i < N; i++) {
        P_0 += Math.pow(lambda / mu, i) / factorial(i);
    }
    return 1 / P_0;
}

function calculate_P_T(lambda, mu, N) {
    // Calculate P_T (probability of entering the queue)
    
    // Calculate P_B for Erlang B
    const P_B = calculate_Erlang_B_P_B(lambda / mu, N);
    
    // Calculate P_T
    return N * P_B / (N - lambda / mu * (1 - P_B));
}

function calculate_E_m(lambda, mu, N) {
    // Calculate E_m (average number of packets in queue)
    const A = lambda / mu;
    
    return A * calculate_P_T(lambda, mu, N) / (N - A);
}

function calculate_E_W(lambda, mu, N) {
    // Calculate E_w (average time in queue)
    
    return calculate_E_m(lambda, mu, N) / lambda;
}

function calculate_E_T(lambda, mu, N) {
    // Calculate E_T (average delay time)
    
    return 1 / mu + calculate_E_m(lambda, mu, N) / lambda;
}

function calculate_E_N(lambda, mu, N) {
    // Calculate E_N (average number of packets in the system)
    const rho = lambda / (N * mu);
    
    return N * rho + calculate_E_m(lambda, mu, N);
}

// Erlang B
function calculate_Erlang_B_P_n(rho, N, n) {
	// Calculate P_n (probability of N users in the system)

	// Sum
	let temp_sum = 0;
	for (let k = 0; k <= N; k++) {
			temp_sum += Math.pow(rho, k) / factorial(k);
	}

	// Result
	return Math.pow(rho, n) / factorial(n) * 1 / temp_sum;
}

function calculate_Erlang_B_P_B(rho, N) {
	// Calculate P_b (blocking probability)

	// Calculate probability of system being full, n=N
	return calculate_Erlang_B_P_n(rho, N, N);
}



//===============================================================================



	return (
		<div>
			{" "}
			<SubmenuTrafic />
			<div className="md:w-3/5 mx-2 md:mx-auto">
				<h1 className="text-2xl text-center mt-2 font-bold border-b-2 border-gray-500 pb-1 ">
					Erlang C Calculator{" "}
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
