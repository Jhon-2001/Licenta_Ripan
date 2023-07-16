import Link from "next/link";
import SubmenuManager from "../../components/SubmenuManager";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";

const Armonici = () => {
	const { state, dispatch } = useContext(DataContext);

	const [setsarr, setSetarr] = useState([]);

	useEffect(() => {
		state.setarmonici.armonici ? setSetarr(state.setarmonici.armonici) : null;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function sort() {
		var sortfarr = setsarr.sort((a, b) => a.fi - b.fi); // sortarre frecvente crescator
		var sortfarr2 = sortfarr.filter((a) => a.fi > 1);

		var sortfarr3 = sortfarr2.filter(
			(value, index, self) => index === self.findIndex((t) => t.fi === value.fi)
		);

		setSetarr(sortfarr3);
		dispatch({
			type: "NOTIFY",
			payload: {
				success: "Frecvențe sortate cu succes", // mesaj de avertizare
			},
		});
	}
	const initialState = {
		frecventa: "",
		banda: "",
	};

	console.log(setsarr);

	return (
		<div>
			<SubmenuManager />
			{/* ---------- > End Meniu + Submeniu */}

			{/* {setsarr.map((x, i) => {
					return (
						<div className="m-5" key={i}>
							
							{x.map((m, index) => {
								console.log("x.f", m.frecventa);
								return (
									<tr key={m.frecventa}>
										<th className="border-r-2  border-gray-700">{index + 1}</th>
										<td className="border-r-2  border-gray-700">{m.frecventa}</td>
										<td className="border-r-2  border-gray-700">{m.band}</td>
										<td className="text-[#e02222] ">
										
										</td>
									</tr>
								);
							})}
						</div>
					);
				})} */}

			<div className="mx-auto w-2/4 mt-2 -mb-2 ">
				<div className="flex">
					{" "}
					<button
						onClick={() => {
							sort();
						}}
						className="bg-blue-700 p-1 whitespace-nowrap mx-auto px-2 rounded-xl mr-2 md:mr-5 text-green-500"
					>
						Sortează si filtrează - Canale Interferență
					</button>
					<div className="bg-gray-700 p-1  whitespace-nowrap mx-auto px-2 rounded-xl mr-2 md:mr-5 text-green-500">
						Total - {setsarr.length}
					</div>
				</div>

				<h1 className="pl-4 text-red-500 font-bold text-center">Din cauza supraincării memoriei grafice a stației de lucru am limitat canalele la un numar de 1000 </h1>
			</div>
			<table className=" radius-xl table mt-4 w-4/5 mx-auto  border-2  border-gray-700 font-medium bg-slate-400">
				<thead className="sticky  top-0 z-5 bg-slate-400 border-b border-gray-800">
					<tr>
						<th className="border-2  border-gray-700">Nr.</th>
						<th className="px-1 border-2 border-gray-700">Canal (MHz)</th>
						<th className="px-1 border-2 border-gray-700">Frecvență (MHz)</th>
						<th className="px-1 border-2 border-gray-700 ">Bandă (kHz)</th>
						{/* <th className=" border-2 border-gray-700 ">
											<svg                    
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
					{setsarr
						? setsarr.map((x, index) => {
								while (index < 500) {
									return (
										<tr key={index}>
											<th className="border-r-2  border-gray-700">{index + 1}</th>
											<td className="border-r-2  border-gray-700">
												{/* {Number.parseFloat(x.fi.toFixed(10))} - {Number.parseFloat(x.fs.toFixed(10))}
												 */}
												{x.fi.toFixed(4)}-{x.fs.toFixed(4)}
											</td>
											<td className="border-r-2  border-gray-700">{x.type}</td>
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
								}
						  })
						: null}
				</tbody>
			</table>
		</div>
	);
};

export default Armonici;