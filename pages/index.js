import Head from "next/head";
import { DataContext } from "../store/GlobalState";
import { useState, useContext, useEffect } from "react";

export default function Helper() {
	const { state, dispatch } = useContext(DataContext);

	return (
		<div>
			<Head>
				<title>Sortare Frecvențe</title>
				{/* <meta name="description" content="Generat de aplicația create next" /> */}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div class="container p-5">
				<div class="flex text-xl border-b-2 border-black pb-1 ">
					<span class="bg-gray-700 px-2   text-xl rounded-full text-red-200">1</span>
					<p className="ml-2"> Setare Listă de Frecvențe</p>
				</div>
				<div className="ml-2 text-md text-gray-900 mt-1">
					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022;</span> Sunt 2 moduri de a seta
						lista de frecvențe:
					</p>
					<p className="ml-4">
						<span className="font-bold"> I</span> : Se poate adăuga manual o frecvență cu banda
						dorită prin apăsarea{" "}
						<button className="bg-gray-800  px-1.5 rounded-xl mb-1 text-gray-200">
							Adaugă Frecvență
						</button>
					</p>
					<p className="ml-4">
						<span className="font-bold"> II</span> : Se poate importa din Excel, cu un format
						standard care poate fi descărcat prin apăsarea butonului:{" "}
						<button className="bg-gray-800  px-1 rounded-xl text-gray-200">Template Excel</button>
					</p>

					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022; </span>
						După ce lista de frecvențe a fost setată, aceasta este filtrată automat și pot fi făcute
						modificări din interfață. Pentru a șterge toate datele, trebuie apăsat butonul{" "}
						<button className="bg-red-700  px-1.5 rounded-xl mb-1 text-gray-200">
							Șterge toate datele
						</button>
					</p>
				</div>

				{/*Secțiunea 1 Final ============================================================================== */}

				<div class="flex text-xl my-2 border-b-2 border-black pb-1 ">
					<span class="bg-gray-700 px-2   text-xl rounded-full text-red-200">2</span>
					<p className="ml-2"> Prelucrare seturi de Frecvențe</p>
				</div>
				<div className="ml-2 text-md text-gray-900 mt-1">
					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022;</span> În acest meniu se află
						2 secțiuni: lista de frecvențe setată anterior și parametrii de
						prelucrare.
					</p>
					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022;</span> Pentru a sorta
						frecvențele, este necesar să se seteze un set de parametrii în funcție de necesitate.
					</p>
					<p>
						{" "}
						<span className="text-xl ml-4 font-bold text-green-700">&#x2022; </span>
						Numărul de armonici trebuie să fie între 1 și 7.
					</p>{" "}
					<p>
						{" "}
						<span className="text-xl ml-4 font-bold text-green-700">&#x2022; </span>
						Numărul de frecvențe din setul generat.
					</p>
					<p>
						{" "}
						<span className="text-xl ml-4 font-bold text-green-700">&#x2022; </span>
						Numărul de frecvențe luate în considerare în generarea intermodulației.
					</p>
					<p>
						{" "}
						<span className="text-xl ml-4 font-bold text-green-700">&#x2022; </span>
						Numărul de canale adiacente pentru canalul de bază, care poate fi 1, 2, 3, 4, 5, 10.
					</p>
					<p>
						{" "}
						<span className="text-xl ml-4 font-bold text-green-700">&#x2022; </span>
						Numărul de canale adiacente pentru canalul de intermodulație.
					</p>
					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022; </span>
						După setarea parametrilor, apăsați butonul{" "}
						<button className="bg-gray-800  px-1.5 rounded-xl mb-1 text-gray-200">
							Generare set
						</button>{" "}
						iar dacă corespunde nevoilor, apăsați butonul{" "}
						<button className="bg-gray-800  px-1.5 rounded-xl mb-1 text-gray-200">
							Salvare set
						</button>.
					</p>
				</div>

				{/*Secțiunea 2 Final ============================================================================== */}

				<div class="flex text-xl my-2 border-b-2 border-black pb-1 ">
					<span class="bg-gray-700 px-2   text-xl rounded-full text-red-200">3</span>
					<p className="ml-2"> Salvare Listă de Ieșire</p>
				</div>
				<div className="ml-2 text-md text-gray-900 mt-1">
					<p>
						{" "}
						<span className="text-xl font-bold text-red-700">&#x2022;</span> După apăsarea butonului{" "}
						<button className="bg-gray-800  px-1 rounded-xl text-gray-200">Seturi Fecvențe</button>{" "}
						seturile de frecvențe prelucrate vor apărea pe ecran, în acest moment avem 2 opțiuni
					</p>

					<p>
						{" "}
						<span className=" font-bold ml-4 text-black-700">I : </span>
						Exportați seturile intr-un tabel Excell.
					</p>
					<p>
						{" "}
						<span className=" font-bold ml-4 text-black-700">II : </span>
						Ștergeți seturile și generați altele noi.
					</p>
				</div>

				{/*Secțiunea 3 Final ============================================================================== */}
				<div class="flex text-xl my-2 border-b-2 border-black pb-1 ">
					<span class="bg-gray-700 px-2   text-xl rounded-full text-red-200">*</span>
					<p className="ml-2">Armonici</p>
				</div>
				<div className="ml-2 text-md text-gray-900 mt-1">
					<p>
						{" "}
						<span className="text-xl font-bold text-black-700">&#x2022; </span>În acest meniu se
						afișează un maxim de 1000 de armonici, numărul este limitat de capacitatea de redare a
						browserului.
					</p>
					<span className="text-xl font-bold text-black-700">&#x2022; </span> Acest meniu ajută la
					vizualizarea modului de generare a canalelor de interferență.
				</div>
				{/*Secțiunea 4 Final ============================================================================== */}
			</div>
		</div>
	);
}
