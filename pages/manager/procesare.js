/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SubmenuManager from "../../components/SubmenuManager";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";

export default function Manager() {
	const [selectedValue, setSelectedValue] = useState("2");
	const [selectedValueBaza, setSelectedValueBaza] = useState("5");

	const [boolarmonici, setBoolarmonici] = useState(false); // verificare armonici
	const [boolintermodulatii, setBoolintermodulatii] = useState(false);

	const [frecventeprocesate, setFreqProcesate] = useState([]); // frecvente procesate
	const [farr, setFarr] = useState([]); // set initial Frecvente
	var sortfarr = farr; // variabila ajutatoare

	function sort() {
		sortfarr = farr.sort((a, b) => a.frecventa - b.frecventa); // sortarre frecvente crescator

		setFarr(sortfarr);
		dispatch({
			type: "NOTIFY",
			payload: {
				success: "Frecvente Sortate cu success", // mesaj de avertizare
			},
		});
	}

	const handleChange = (e) => {
		setSelectedValue(e.target.value);
		// console.log(selectedValue);
	};
	const handleChangeBaza = (e) => {
		setSelectedValueBaza(e.target.value);
		// console.log(selectedValueBaza);
	};
	const handleMouseOver = () => {
		setBoolarmonici(true);
	};
	const handleMouseOut = () => {
		setBoolarmonici(false);
	};
	const handleMouseOverI = () => {
		setBoolintermodulatii(true);
	};
	const handleMouseOutI = () => {
		setBoolintermodulatii(false);
	};
	//---------------------------------------------------------------------------------------------
	const initialState = { armonica: 3, nrfreq: 5, val: "1+2", nrfreqinterm: 2, chadiacent: 5 };
	const [procesaredata, setProcesaredata] = useState(initialState);
	const { armonica, nrfreq, nrfreqinterm } = procesaredata;

	// -------------------------------------------------------------------------------------------- Date intrare
	const { state, dispatch } = useContext(DataContext);
	useEffect(() => {
		state.setfreq.farr ? setFarr(state.setfreq.farr) : null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// -------------------------------------------------------------------------------------------  Global store

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProcesaredata({ ...procesaredata, [name]: value });
		// console.log(procesaredata);
	};

	// ------------------------------------------------------------------------------------------ Preluare date intrare

	const handleSubmit = (x) => {
		x.preventDefault(); // previne refresh la pagina

		if (procesaredata.armonica > 7 || procesaredata.armonica < 0) {
			// verificare armonica intre 0 - 7
			dispatch({
				type: "NOTIFY",
				payload: {
					error: "Armoinca este mai mare decat 1 si mai mica decat 7", // mesaj de avertizare
				},
			});
			setProcesaredata(initialState);
			return;
		}
		if (procesaredata.armonica % 1 != 0) {
			dispatch({
				type: "NOTIFY",
				payload: {
					error: "Armoinca este numar intreg", // mesaj de avertizare
				},
			});
			setProcesaredata(initialState);
			return;
		}
		var defaultarr = [];

		for (var u = 0; u < farr.length; u++) {
			defaultarr.push({
				frecventa: +farr[u].frecventa,
				band: +farr[u].band,
				fi: Number(farr[u].frecventa) - Number(farr[u].band / 1000 / 2),
				fs: Number(farr[u].frecventa) + Number(farr[u].band / 1000 / 2),
				relativeband: Number(farr[u].band / 10000 / 2),
			});
		}
		// =============================================================================================== Procesare frecvente
		const sorted = []; // definire array gol in care se seteaza frecventele
		var armonici = []; // definire array in care se insereaza aromicile cu benzile aferente
		var swap = farr;
		var nintermodulatie = +procesaredata.val;
		// definire lista de frecvente din care se elimina frecventele deja folosite

		for (let i = 0; i < defaultarr.length && +sorted.length < +nrfreq; i++) {
			// for care trece prin toate frecventele, tine cont de lugime sete

			// console.log(defaultarr[i], armonici);
			armonici = [...new Set(armonici)];
			// ---------------------------------------------------------------------------------------------------Verificare frecvente compatibile
			var incanal = false; // definire variabila de tip  bool - false
			for (var n = 0; n < armonici.length; n++) {
				if (

					+defaultarr[i].frecventa < armonici[n].fs + +defaultarr[i].relativeband &&
					+defaultarr[i].frecventa > armonici[n].fi - +defaultarr[i].relativeband &&
					+armonici[n].freq != +defaultarr[i].frecventa
				) {
					incanal = true;
				}
			}
			if (incanal == false) {
				sorted.push(defaultarr[i]);
				swap = swap.filter((item) => +item.frecventa !== +defaultarr[i].frecventa);
			}
			if (incanal != true) {
				if (sorted.length > 1) {
					var temparr = [];
					var tempband = [];
					for (let y = 0; y <= sorted.length - 1; y++) {
						// console.log(sorted[y].frecventa);
						temparr.push(sorted[y].frecventa);
						tempband.push(sorted[y].band);
					}
					var wdband = Math.max(...tempband);
					// ===========================================================================================================
					const powerset = (arr) =>
						arr.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);
					var canaleintermodulatii = powerset(temparr).filter((x) => x.length > 1);
					canaleintermodulatii = [...new Set(canaleintermodulatii)];
					canaleintermodulatii = canaleintermodulatii.filter((x) => x.length <= +nrfreqinterm);

					// console.log(canaleintermodulatii);

					function generateCombinations(array, index, currentResult, results) {
						if (index === array.length) {
							results.push(currentResult);
							return;
						}
						if (+procesaredata.val == 1 || procesaredata.val == "1+2")
							generateCombinations(array, index + 1, +currentResult + +array[index], results);
						generateCombinations(array, index + 1, +currentResult - +array[index], results);

						if (+procesaredata.val == 2 || procesaredata.val == "1+2") {
							generateCombinations(array, index + 1, +currentResult + +array[index] * 2, results);
							generateCombinations(array, index + 1, +currentResult - +array[index] * 2, results);
						}
					}

					function generateCombinationsChar(array, index, currentResult, results) {
						if (index === array.length) {
							resultschar.push(currentResult);
							return;
						}
						generateCombinationsChar(
							array,
							index + 1,
							currentResult + " + " + array[index],
							resultschar
						);
						generateCombinationsChar(
							array,
							index + 1,
							currentResult + " - " + array[index],
							resultschar
						);
						generateCombinationsChar(
							array,
							index + 1,
							currentResult + " + " + array[index] + "*2",
							resultschar
						);
						generateCombinationsChar(
							array,
							index + 1,
							currentResult + " - " + array[index] + "*2",
							resultschar
						);
					}

					const resultschar = [];
					for (var c = 0; c < canaleintermodulatii.length; c++) {
						generateCombinationsChar(canaleintermodulatii[c], 0, "", resultschar);
					}
					const results = [];
					// console.log("Interm length", canaleintermodulatii.length);
					for (var c = 0; c < canaleintermodulatii.length; c++) {
						generateCombinations(canaleintermodulatii[c], 0, "", results);
					}

					// let uniqlist = [...new Set(results.filter((e) => e > 0))];

					let uniqlist0 = results.map((x) => Number.parseFloat(x.toFixed(3)));
					let uniqlistchar = resultschar;

					for (let i = 0; i < uniqlist0.length; i++) {
						// console.log(+uniqlist0[i])

						armonici.push({
							fi: Number(+uniqlist0[i] - +(wdband * selectedValue) / 1000),
							fs: Number(+uniqlist0[i] + +(wdband * selectedValue) / 1000),
							type: resultschar[i],
							band: wdband,
						});
					}

					// ===========================================================================================================

					// console.log(sorted, armonici);
				}

				for (let k = 1; k - 1 <= procesaredata.armonica; k++) {
					if (k == 1) {
						var fi =
							Number(defaultarr[i].frecventa * k) -
							Number((selectedValueBaza * defaultarr[i].band) / 1000);
						var fs =
							Number(defaultarr[i].frecventa * k) +
							Number((selectedValueBaza * defaultarr[i].band) / 1000);
						armonici.push({
							fi: fi,
							fs: fs,
							freq: +defaultarr[i].frecventa,
							type: `Canal de Baza : ${defaultarr[i].frecventa}`,
							band: defaultarr[i].band * selectedValueBaza,
						});
					}
					if (k > 1) {
						var fi = Number(defaultarr[i].frecventa * k) - Number(defaultarr[i].band / 200 / 5);
						var fs = Number(defaultarr[i].frecventa * k) + Number(defaultarr[i].band / 200 / 5);
						armonici.push({
							fi: fi,
							fs: fs,
							freq: +defaultarr[i].frecventa,
							type: `Armonica : Frecventa ${defaultarr[i].frecventa} * Armonica ${k}`,
							band: defaultarr[i].band,
						});
					}
					// ------------------------------------------------------------------------------------------------- Inserare armonici in array
					// if(sorted.frecventa.includes(Number(defaultarr[i].frecventa)))

					// console.log("fs", fs, "fi", fi,"freq",+defaultarr[i].frecventa);
				}
			}
		}
		setFarr(swap);
		setFreqProcesate(sorted); // setare lista finala frecvente procesae
		// console.log(armonici);

		dispatch({
			type: "ARMONICI",
			payload: {
				armonici,
			},
		});
		// ==================================================================================================
	};
	const [subset, setSubset] = useState([]); // seturi frecvente

	var swap2 = subset;

	const save = (e) => {
		e.preventDefault();
		swap2.push(frecventeprocesate);
		dispatch({
			type: "SETS",
			payload: {
				seturi: swap2,
			},
		});
		dispatch({ type: "NOTIFY", payload: { success: "Set de " + nrfreq + " frecvente adaugat" } });

		setSubset(swap2);
		setFreqProcesate([]);
	};

	function delete2(x) {
		setFreqProcesate(
			frecventeprocesate.filter(function (frecventeprocesate) {
				return frecventeprocesate.frecventa != x.frecventa;
			})
		);
		farr.push(x);
	}
	return (
		<div className="m-0 flex-row">
			<SubmenuManager />

			<div className="w-4/5 mx-auto">
				<div className="md:grid md:grid-cols-2  gap-4">
					{" "}
					<div className="">
						<h2 className="pt-4 mr-6 md:text-xl text-center font-bold tracking-wide">
							<span className="">
								<button
									onClick={() => {
										sort();
									}}
									className="bg-blue-700 p-1 px-2 rounded-xl mr-2 md:mr-5 text-green-500"
								>
									Sort
								</button>
							</span>
							Plan de frecvente{" "}
						</h2>
						<div className="mt-4 static md:border-r-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-600 scrollbar-track-gray-300 overflow-y-auto border-slate-400 pr-6  md:h-[60vh]  ">
							<table className=" radius-xl table w-full  border-2  border-gray-700 font-medium bg-slate-400">
								<thead className="sticky  top-0 z-5 bg-slate-400 border-b border-gray-800">
									<tr>
										<th className="border-2  border-gray-700">Nr.</th>
										<th className="px-1 border-2 border-gray-700">Freq (MHz)</th>
										<th className="px-1 border-2 border-gray-700 ">Band (kHz)</th>
										{/* <th className=" border-2 border-gray-700 ">
											<svg
												className="mx-auto "
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="25"
												viewBox="0 0 30 30"
											>
												<path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
											</svg>
										</th> */}
									</tr>
								</thead>
								<tbody className="text-center text-[#000000]">
									{farr
										? farr.map((x, index) => {
												return (
													<tr key={x.frecventa}>
														<th className="border-r-2  border-gray-700">{index + 1}</th>
														<td className="border-r-2  border-gray-700">{x.frecventa}</td>
														<td className="border-r-2  border-gray-700">{x.band}</td>
														{/* <td className="text-[#e02222] "> */}
														{/* <button
																className="hover:scale-110"
																onClick={() =>
																	setFarr(
																		farr.filter(function (farr) {
																			return farr.frecventa != x.frecventa;
																		})
																	)
																}
															>
																{" "}
																Sterge
															</button> */}
														{/* </td> */}
													</tr>
												);
										  })
										: null}
								</tbody>
							</table>
						</div>
					</div>
					<div className="mr-6 md:mr-0">
						<form onSubmit={handleSubmit}>
							<div className="md:flex  pt-4">
								<div className="mb-2  md:w-1/2 w-full ">
									<label htmlFor="email" className="block mb-1 font-bold text-md text-gray-900 ">
										<span
											onMouseOver={handleMouseOver}
											onMouseOut={handleMouseOut}
											data-tooltip-target="tooltip-default"
											className="bg-gray-400 px-1.5 hover:scale-110  py-0 text-md text-red-700 border-2 border-red-600  font-bold rounded-full"
										>
											?
										</span>{" "}
										Nr. Armonici ( 1-7 )
									</label>
									{boolarmonici && (
										<div className=" p-1 pt-0 absolute bg-gray-400 border-2  font-medium border-gray-700 mr-16 z-100 rounded-md">
											{" "}
											Armonica unei frecvente este egală cu un multiplu întreg al frecvenţei
											fundamentale <br />
											Ex: Pentru frecventa de <span className="font-bold">20MHz</span> avem
											urmatoarle armonici:{" "}
											<span className="font-bold">40MHz(I) - 60MHz(II) - 80(III) - 100MHz(IV)</span>
											<img alt="armonici" src="\images\armonici.png"></img>
										</div>
									)}
									<input
										
										step="1"
										type="number"
										onChange={handleChangeInput}
										value={armonica}
										name="armonica"
										className="ml-1 border w-full  border-blue-900 text-slate-200 text-sm rounded-lg bg-gray-700  block p-2.5 "
										default="3"
										required
									></input>{" "}
								</div>
								<div className="mb-6 md:w-1/2 w-full">
									<label
										htmlFor="password"
										className="block px-1 mb-1 font-bold  text-md text-gray-900 "
									>
										Lungime Set
									</label>
									<input
										type="number"
										value={nrfreq}
										name="nrfreq"
										onChange={handleChangeInput}
										id="password"
										placeholder={"1 - " + farr.length + " frevente"}
										className=" border w-full ml-2  text-slate-200 border-blue-900  text-sm rounded-lg bg-gray-700  p-2.5 "
										required
									></input>{" "}
								</div>
							</div>
							<div className="mb-2 w-full pb-5 -mt-4 ">
								<label htmlFor="email" className="block mb-1 font-bold text-md text-gray-900 ">
									Numarul de frecvente luate in calculul intermodulatiilor | 2 - Lungime set({" "}
									{nrfreq} )
								</label>
								{/* {boolarmonici && (
									<div className=" p-1 pt-0 absolute bg-gray-400 border-2  font-medium border-gray-700 mr-16 z-100 rounded-md">
										{" "}
										Armonica unei frecvente este egală cu un multiplu întreg al frecvenţei
										fundamentale <br />
										Ex: Pentru frecventa de <span className="font-bold">20MHz</span> avem urmatoarle
										armonici:{" "}
										<span className="font-bold">40MHz(I) - 60MHz(II) - 80(III) - 100MHz(IV)</span>
										<img alt="armonici" src="\images\armonici.png"></img>
									</div>
								)} */}
								<input
									min="2"
									max={nrfreq}
									step="1"
									type="number"
									onChange={handleChangeInput}
									value={nrfreqinterm}
									name="nrfreqinterm"
									id="nrfreqinterm"
									className="ml-1 border w-full  border-blue-900 text-slate-200 text-sm rounded-lg bg-gray-700  block p-2.5 "
									required
								></input>{" "}
							</div>

							<div className=" -mt-3">
								<div className="mb-6 w-full form-check">
									<label
										htmlFor="password"
										className="block  ml-2 font-bold  text-md text-gray-900 "
									>
										{" "}
										<div className="  w-full">
											<span
												onMouseOver={handleMouseOverI}
												onMouseOut={handleMouseOutI}
												className="bg-gray-400  px-1.5 mr-1 -ml-2 py-0 text-red-700 border-2 border-red-600  font-bold rounded-full"
											>
												?
											</span>
											<span class=" "> Ordin produse intermodulatie</span>
											{boolintermodulatii && (
												<div className="p-1 absolute pt-0 bg-gray-400 border-2  font-medium border-gray-700 mr-16 z-100 rounded-md">
													{" "}
													Intermodulația este modularea în amplitudine a semnalelor care conțin două
													sau mai multe frecvențe diferite, cauzată de neliniarități sau de variația
													de timp dintr-un sistem. Intermodulația dintre componentele de frecvență
													va forma componente suplimentare, nu doar armonice (multipli întregi) ale
													ci și la frecvențele suma șidiferența ale frecvențelor originale și la
													sumele și diferențele multiplilor acestora. <br />
													Ex:
													<span className="font-bold"> F1 + F2 , F1-F2 , 2F1 + F2, F1+F2+F3</span>
													<img
														className="w-full"
														alt="armonici"
														src="\images\intermodulatii.png"
													></img>
												</div>
											)}
										</div>
									</label>
									<input
										type="radio"
										value="1"
										name="val"
										onChange={handleChangeInput}
										checked={procesaredata.val == "1"}
										id="val1"
										className="w-4 h-4 ml-6"
									></input>{" "}
									<label className="text-md grow font-bold ml-1">
										<span className="text-red-600 font-bold text-md">I:</span> F1 ± F2{" "}
									</label>
									<input
										type="radio"
										value="2"
										name="val"
										onChange={handleChangeInput}
										id="val2"
										className="w-4 h-4 ml-2"
										checked={procesaredata.val == "2"}
									></input>{" "}
									<label className="text-md grow font-bold ml-1">
										<span className="text-red-600 font-bold text-md">II :</span> 2F1 ± F2 sau 2F2 ±
										F1{" "}
									</label>
									<input
										type="radio"
										value="1+2"
										name="val"
										onChange={handleChangeInput}
										checked={procesaredata.val == "1+2"}
										id="val3"
										className="w-4 h-4 ml-2"
									></input>{" "}
									<label className="text-md font-bold ml-1">
										<span className="text-red-600 font-bold text-md">I + II</span>
									</label>
								</div>
								<div className="md:flex -mt-3">
									<div className="mb-2 font-bold w-full ">
										<label
											htmlFor="email"
											className="ml-6 block mb-1 font-bold text-md text-gray-900 "
										>
											Numar canale adiacente pentru frecventa de baza
										</label>
										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option21"
											name="chadiacentBaza"
											value="1"
											onChange={handleChangeBaza}
											checked={selectedValueBaza === "1"}
										/>
										<label for="option1">1</label>

										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option22"
											name="chadiacentBaza"
											value="2"
											onChange={handleChangeBaza}
											checked={selectedValueBaza === "2"}
										/>
										<label for="option2">2</label>

										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option23"
											name="chadiacentBaza"
											value="3"
											onChange={handleChangeBaza}
											checked={selectedValueBaza === "3"}
										/>
										<label for="option3">3</label>

										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option24"
											name="chadiacentBaza"
											value="4"
											onChange={handleChangeBaza}
											checked={selectedValueBaza === "4"}
										/>
										<label for="option4">4</label>

										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option25"
											name="chadiacentBaza"
											checked={selectedValueBaza === "5"}
											value="5"
											onChange={handleChangeBaza}
										/>
										<label for="option5">5</label>
										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option25"
											name="chadiacentBaza"
											checked={selectedValueBaza === "10"}
											value="10"
											onChange={handleChangeBaza}
										/>
										<label for="option5">10</label>
									</div>
								</div>
								<div className="md:flex -mt-3">
									<div className="mb-2 font-bold w-full ">
										<label htmlFor="email" className="block mb-1 font-bold text-md text-gray-900 ">
											<span className="pl-6"></span> Numar canale adiacente pentru intermodulatii
										</label>
										<input
											className="w-4 h-4 ml-6"
											type="radio"
											id="option21"
											name="chadiacent"
											value="1"
											onChange={handleChange}
											checked={selectedValue === "1"}
										/>
										<label for="option1">1</label>

										<input
											checked={selectedValue === "2"}
											className="w-4 h-4 ml-6"
											type="radio"
											id="option22"
											name="chadiacent"
											value="2"
											onChange={handleChange}
										/>
										<label for="option2">2</label>

										<input
											checked={selectedValue === "3"}
											className="w-4 h-4 ml-6"
											type="radio"
											id="option23"
											name="chadiacent"
											value="3"
											onChange={handleChange}
										/>
										<label for="option3">3</label>

										<input
											checked={selectedValue === "4"}
											className="w-4 h-4 ml-6"
											type="radio"
											id="option24"
											name="chadiacent"
											value="4"
											onChange={handleChange}
										/>
										<label for="option4">4</label>

										<input
											checked={selectedValue === "5"}
											className="w-4 h-4 ml-6"
											type="radio"
											id="option25"
											name="chadiacent"
											value="5"
											onChange={handleChange}
										/>
										<label for="option5">5</label>
									</div>
								</div>

								<button
									type="submit"
									// onClick={ handleSubmit}
									className="text-white shadow-lg -mt-0.5 py-2.5 mb-2 text-sm font-bold md:whitespace-nowrap w-full  ml-1.5 bg-green-700 border-2 hover:border-green-500 border-green-600 rounded-lg"
								>
									Genereaza Set Frecvente
								</button>
							</div>
						</form>

						<div className="pt-4">
							{/* <button
								// onClick={SalveazaArr}
								className="text-white  text-center w-1/2 ml-1  md:whitespace-nowrap font-medium rounded-lg text-sm px-5 py-2.5 border-2 hover:bg-[#435ed4] border-[#1630a3] bg-[#344cb3]"
							>
								Salveaza Set
							</button>
							<button
								// onClick={DeleteFarr}
								className="text-white text-center w-1/2 ml-1 pl-4 -mr-2 md:whitespace-nowrap font-medium rounded-lg text-sm px-5 py-2.5 border-2 hover:bg-[#ec2415] border-[#910000]  bg-[#da0000]"
							>
								Sterge Set
							</button> */}
						</div>
						<table className="ml-2 radius-xl table w-full  border-2  border-gray-700 font-medium bg-slate-400">
							<thead className="  top-0 z-5 bg-slate-400 border-b border-gray-800">
								<tr>
									<th className="border-2  border-gray-700">Nr.</th>
									<th className="px-1 border-2 border-gray-700">Frecventa (MHz)</th>
									<th className="px-1 border-2 border-gray-700 ">Banda RF (kHz)</th>
									<th className=" border-2 border-gray-700 ">
										<svg
											className="mx-auto "
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="25"
											viewBox="0 0 30 30"
										>
											<path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
										</svg>
									</th>
								</tr>
							</thead>
							<tbody className="text-center text-[#000000]">
								{frecventeprocesate.length > 0
									? frecventeprocesate.map((x, index) => {
											return (
												<tr key={x.frecventa}>
													<th className="border-r-2  border-gray-700">{index + 1}</th>
													<td className="border-r-2  border-gray-700">{x.frecventa}</td>
													<td className="border-r-2  border-gray-700">{x.band}</td>
													<td className="text-[#e02222] ">
														<button className="hover:scale-110" onClick={() => delete2(x)}>
															{" "}
															Sterge
														</button>
													</td>
												</tr>
											);
									  })
									: null}
							</tbody>
						</table>
						<form onSubmit={save}>
							{frecventeprocesate.length > 0 ? (
								<button
									type="submit"
									className="text-white mt-4 ml-2 w-full shadow-lg py-2.5 mb-2 text-sm font-bold  md:whitespace-nowrap rounded-lg  px-5  border-2 hover:bg-[#435ed4] border-[#1630a3] bg-[#344cb3]"
								>
									Salveaza Set Frecvente
								</button>
							) : null}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
