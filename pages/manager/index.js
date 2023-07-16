import Link from "next/link";
import SubmenuManager from "../../components/SubmenuManager";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import * as XLSX from "xlsx";

export default function Manager() {
	const data = [{ Frecventa_Mhz: [{ width: 200 }], Banda_kHz: [{ width: 200 }] }];
	const downloadExcel = (data) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		// let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
		XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
		XLSX.writeFile(workbook, "Set Frecvente .xlsx");
	};

	const [isHovering, setIsHovering] = useState(false);
	const [isHoveringBand, setIsHoveringBand] = useState(false);
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const initialState = {
		frecventa: "",
		banda: "",
	};

	const handleMouseOverBand = () => {
		setIsHoveringBand(true);
	};
	const handleMouseOutBand = () => {
		setIsHoveringBand(false);
	};
	// const [items, setItems] = useState([]);
	const [fdata, setFdata] = useState(initialState);
	const { frecventa, banda } = fdata;

	const readExcel = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);

			fileReader.onload = (e) => {
				const bufferArray = e.target.result;
				const wb = XLSX.read(bufferArray, { type: "buffer" });
				console.log("wb",wb)

				const wsname = wb.SheetNames[0];

				const ws = wb.Sheets[wsname];

				var data = XLSX.utils.sheet_to_json(ws);
				data.map((e) => {
					if (e[Object.keys(e)[0]] < 1 || e[Object.keys(e)[0]] > 10000) {
						reject(
							dispatch({
								type: "NOTIFY",
								payload: {
									error: "Frecventa > 1 MHz si < 10000 MHz",
								},
							})
						);
					}
				});
				resolve(data);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});

		promise.then((d) => {
			let arr = farr;

			d.map((e) =>
				arr.push({ frecventa: e[Object.keys(e)[0]].toFixed(3), band: e[Object.keys(e)[1]] })
			);

			var help = farr.filter(
				(value, index, self) => index === self.findIndex((t) => t.frecventa === value.frecventa)
			);
			let distinct = [];
			let duplicates = [];
			farr.forEach((item) => {
				if (distinct.find((current) => current.frecventa === item.frecventa)) {
					duplicates.push(item);
				} else {
					distinct.push(item);
				}
			});

			duplicates.length > 0
				? dispatch({
						type: "NOTIFY",
						payload: {
							error: `${
								"Atenție, frecvențe duplicate. Pentru buna funcționare au fost eliminate." +
								duplicates.map((e) => e.frecventa + "MHz ")
							}`,
						},
				  })
				: null;

			setFarr([...distinct]);
		});
	};

	const { state, dispatch } = useContext(DataContext);

	useEffect(() => {
		state.setfreq.farr ? setFarr(state.setfreq.farr) : null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [farr, setFarr] = useState([]);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setFdata({ ...fdata, [name]: value });
	};
	const handleSubmit = async (x) => {
		x.preventDefault();
		var dublura = farr.find((x) => x.frecventa == frecventa);
		if (dublura) {
			dispatch({
				type: "NOTIFY",
				payload: {
					error: "Dublura la frecventa de " + frecventa + " MHz",
				},
			});

			return;
		}
		if (frecventa < 1 || frecventa > 10000) {
			dispatch({
				type: "NOTIFY",
				payload: {
					error: "Frecventa > 1 MHz si < 10000 MHz",
				},
			});
			setFdata(initialState);
			return;
		}
		if (banda < 2 || banda > 5000) {
			dispatch({
				type: "NOTIFY",
				payload: {
					error: "Banda > 2 kHz si < 5000 kHz",
				},
			});
			setFdata(initialState);
			return;
		}
		dispatch({
			type: "NOTIFY",
			payload: {
				success: " Frecventa de " + frecventa + " MHz cu " + "Banda de " + banda + " Khz a fost introdusă în set",
			},
		});

		setFarr([...farr, { frecventa, band: banda }]);
	};
	useEffect(() => {
		dispatch({
			type: "SETF",
			payload: {
				farr,
			},
		});
	}, [dispatch, farr]);

	
	const DeleteFarr = (e) => {
		e.preventDefault();
		const response = prompt(
			"Doriti sa stergeti setul de frecvente, pentru confimrare scrieti `da`"
		);
		if (response == "da") {
			setFarr([]);
		}
	};
	const SalveazaArr = (e) => {
		e.preventDefault();
		dispatch({
			type: "SETF",
			payload: {
				farr,
			},
		});
	};
	return (
		<div>
			<SubmenuManager />
			{/* ---------- > End Meniu + Submeniu */}

			<div className="">
				<div className="w-11/12 md:w-4/5 xl:w-3/5 mx-auto text-center pr-3 border-slate-400 md:col-span-3 col-span-6  ">
					<form>
						<div className="flex mr-1.5 -ml-0.5 ">
							<div className="mb-2 w-1/2 ">
								<label
									htmlFor="email"
									className="block  mb-2 px-1 font-bold pt-1 text-md m text-gray-900 "
								>
									Frecventa ( MHz )
								</label>
								<input
									type="number"
									onChange={handleChangeInput}
									value={frecventa}
									name="frecventa"
									id="email"
									className=" border w-full  border-blue-900 ml-2  text-slate-200 text-sm rounded-lg bg-gray-700  block p-2.5 "
									placeholder="1 - 10000 MHz"
									required
								></input>{" "}
							</div>
							<div className="mb-6 w-1/2">
								<label
									htmlFor="password"
									className="block  mb-2 px-1 font-bold pt-1 text-md text-gray-900 "
								>
									<span
										onMouseOver={handleMouseOverBand}
										onMouseOut={handleMouseOutBand}
										className="bg-gray-400 px-1.5 -ml-2  text-red-700 border-2 border-red-600  font-bold rounded-full"
									>
										?
									</span>{" "}
									Banda ( kHz )
								</label>
								{isHoveringBand && (
									<div className="absolute border-2 w-full md:w-1/2 left-[30%]  border-gray-800 rounded-md bg-gray-300">
										<h1 className="text-gray-800 font-bold">
											Banda în jurul purtătoarei unui semnal se referă la intervalul de frecvențe în
											care energia semnalului este concentrată în jurul frecvenței purtătoarei.
											
										</h1>
										<h1>De Regula pentru HF banda este 3 kHz</h1>
										<h1>De Regula pentru VHF banda este 25 kHz</h1>
										<h1>De Regula pentru SHF banda este pana la ordinul MHz </h1>
									</div>
								)}
								<input
									type="number"
									value={banda}
									name="banda"
									onChange={handleChangeInput}
									id="password"
									placeholder="2 - 5000 kHz"
									className=" border w-full ml-3 text-slate-200 border-blue-900  text-sm rounded-lg bg-gray-700  p-2.5 "
									required
								></input>{" "}
							</div>
						</div>

						{/* <div className="flex mr-1.5 pb-5 -ml-0.5 -mt-6 ">
							<div className="mb-2 w-1/2 ">
								<label
									htmlFor="email"
									className="block  mb-2 px-1 font-bold pt-1 text-md  text-gray-900 "
								>
									Putere ( w )
								</label>
								<input
									type="number"
									onChange={handleChangeInput}
									value={putere}
									name="putere"
									id="email"
									className=" border w-full  border-blue-900 ml-2  text-slate-200 text-sm rounded-lg bg-gray-700  block p-2.5 "
									placeholder="- 200   -   200 w"
									required
								></input>{" "}
							</div>
							<div className="mb-6 w-1/2">
								<label
									htmlFor="password"
									className="block  mb-2 px-1 font-bold pt-1 text-md text-gray-900 "
								>
									Distanta ( m )
								</label>
								<input
									type="number"
									value={distanta}
									name="distanta"
									onChange={handleChangeInput}
									id="password"
									placeholder="1   -   2000 Km"
									className=" border w-full ml-3 text-slate-200 border-blue-900  text-sm rounded-lg bg-gray-700  p-2.5 "
									required
								></input>{" "}
							</div>
						</div> */}

						<div className=" -mt-3">
							<button
								type="submit"
								onClick={handleSubmit}
								className="text-white  shadow-xl -mt-0.5 py-2.5 mb-1 text-sm font-bold md:whitespace-nowrap w-full  ml-1.5 bg-green-700 border-2 hover:border-green-500 border-green-600 rounded-lg"
							>
								Adauga Frecventa
							</button>
							<div className="flex">
								<label for="first_name" class="block mb-2 text-sm font-bold text-red-600">
									<span class="bg-green-100 rounded-xl px-2 font-bold text-md mr-1">!!</span>EXCEL:
									Col 1 - Frecventa ^ Col 2 - Banda
								</label>
							</div>
							<div className="grid sm:grid-cols-2 ">
								<div>
									<label className="text-white  flex justify-center shadow-xl -mt-2  py-2.5 mb-3 md:mb-2 text-sm font-bold md:whitespace-nowrap  ml-1 -mr-1 bg-slate-900 border-2  hover:bg-slate-800 hover:border-green-500 border-green-600 rounded-lg">
										{" "}
										<input
											onChange={(e) => {
												const file = e.target.files[0];
												readExcel(file);
											}}
											key={this}
											type="file"
											className="block w-4/5"
										></input>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 48 48"
											width="26px"
											height="26px"
										>
											<rect width="16" height="9" x="28" y="15" fill="#21a366" />
											<path
												fill="#185c37"
												d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"
											/>
											<rect width="16" height="9" x="28" y="24" fill="#107c42" />
											<rect width="16" height="9" x="12" y="15" fill="#3fa071" />
											<path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z" />
											<path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z" />
											<path
												d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z"
												opacity=".05"
											/>
											<path
												d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z"
												opacity=".07"
											/>
											<path
												d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z"
												opacity=".09"
											/>
											<linearGradient
												id="flEJnwg7q~uKUdkX0KCyBa"
												x1="4.725"
												x2="23.055"
												y1="14.725"
												y2="33.055"
												gradientUnits="userSpaceOnUse"
											>
												<stop offset="0" stopColor="#18884f" />
												<stop offset="1" stopColor="#0b6731" />
											</linearGradient>
											<path
												fill="url(#flEJnwg7q~uKUdkX0KCyBa)"
												d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"
											/>
											<path
												fill="#fff"
												d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"
											/>
										</svg>
									</label>
								</div>
								<button
									className="text-white flex justify-center shadow-xl  -mt-2 py-2.5 mb-2 text-sm font-bold md:whitespace-nowrap -mr-1.5 ml-1.5 bg-slate-900 hover:bg-slate-800 border-2 hover:border-green-500 border-green-600 rounded-lg"
									onClick={() => downloadExcel(data)}
								>
									<span className="pr-6">Template excell</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 48 48"
										width="26px"
										height="26px"
									>
										<rect width="16" height="9" x="28" y="15" fill="#21a366" />
										<path
											fill="#185c37"
											d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"
										/>
										<rect width="16" height="9" x="28" y="24" fill="#107c42" />
										<rect width="16" height="9" x="12" y="15" fill="#3fa071" />
										<path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z" />
										<path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z" />
										<path
											d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z"
											opacity=".05"
										/>
										<path
											d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z"
											opacity=".07"
										/>
										<path
											d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z"
											opacity=".09"
										/>
										<linearGradient
											id="flEJnwg7q~uKUdkX0KCyBa"
											x1="4.725"
											x2="23.055"
											y1="14.725"
											y2="33.055"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset="0" stopColor="#18884f" />
											<stop offset="1" stopColor="#0b6731" />
										</linearGradient>
										<path
											fill="url(#flEJnwg7q~uKUdkX0KCyBa)"
											d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"
										/>
										<path
											fill="#fff"
											d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"
										/>
									</svg>
								</button>
							</div>
							{/* <button
								onClick={SalveazaArr}
								className="text-white shadow-xl text-center w-1/2 ml-1  md:whitespace-nowrap font-medium rounded-lg text-sm px-5 py-2.5 border-2 hover:bg-[#435ed4] border-[#1630a3] bg-[#344cb3]"
							>
								Salveaza Set
							</button> */}
							<button
								onClick={DeleteFarr}
								className="text-white w-full text-center  ml-1 pl-4 -mr-2 md:whitespace-nowrap font-medium rounded-lg text-sm px-5 py-2.5 border-2 hover:bg-[#ec2415] border-[#910000]  bg-[#da0000]"
							>
								Sterge Set
							</button>
						</div>
					</form>
					{/* --------->  start Table Freq  */}
					<div>
						{" "}
						<h2 className=" ml-3  mt-4 border-t-4 border-gray-700 text-xl md:text-2xl font-bold tracking-wide">
							Tabel frecvente alocate ~ ( {farr.length} )
						</h2>
						<div
							className="hidden md:flex "
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
						>
							{" "}
							<span className="bg-gray-400 px-1.5 mr-1 -ml-2  text-red-700 border-2 border-red-600  font-bold rounded-full">
								?
							</span>{" "}
							<span className=" -pt-3"> Range Frecvente</span>
						</div>
						{isHovering && (
							<div className=" font-bold text-slate-800 border-4 rounded-md ml-4 border-slate-700 ">
								<h2 className="">2 - 30 MHz - HF</h2>
								<h2>30 - 108/300 MHz - VHF</h2>
								<h2>300 - 3000 MHz(3GHz) - UHF</h2>
								<h2>3000(3GHz) - 30000 MHz(30GHz) - SHF</h2>
							</div>
						)}
						<div className="rounded-sm ml-2  static  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-600 scrollbar-track-gray-300 overflow-y-auto h-[60vh] -mr-2 ">
							<table className=" table w-full border-2 border-gray-700 font-medium bg-slate-400">
								<thead className="sticky  top-0 z-5 bg-slate-400 border-b border-gray-800">
									<tr>
										<th className="border-2  border-gray-700">Nr.</th>
										<th className="px-1 border-2 border-gray-700">Freq (MHz)</th>
										<th className="px-1 border-2 border-gray-700 ">Band (kHz)</th>
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
										<th className=" border-2  border-gray-700 ">
											<svg
												className="mx-auto"
												width="20"
												height="25"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
													fill="#000000"
												/>
											</svg>
										</th>
									</tr>
								</thead>
								<tbody className="text-center text-[#000000]">
									{farr
										? farr.map((x, index) => {
												return (
													<tr key={index + 1}>
														<th className="border-r-2  border-gray-700">{index + 1}</th>
														<td className="border-r-2  border-gray-700">
															{+x.frecventa >= 2 && +x.frecventa <= 30
																? +x.frecventa + " - HF"
																: x.frecventa >= 30 && x.frecventa <= 300
																? x.frecventa + " - VHF"
																: x.frecventa >= 300 && x.frecventa <= 3000
																? x.frecventa + " - UHF"
																: x.frecventa + "- SHF"}
														</td>
														<td className="border-r-2  border-gray-700">{x.band}</td>
														<td className="text-[#e02222] ">
															<button
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
															</button>
														</td>
														<td className="text-blue-700 ">
															<button
																className="hover:scale-110"
																onClick={() => {
																	setFdata({
																		frecventa: x.frecventa,
																		banda: x.band,
																	});
																	setFarr(
																		farr.filter(function (farr) {
																			return farr.frecventa != x.frecventa;
																		})
																	);
																}}
															>
																{" "}
																Editeaza
															</button>
														</td>
													</tr>
												);
										  })
										: null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/* --------->  finish Table Freq  */}
			</div>
		</div>
	);
}
