import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SubmenuTrafic = () => {
	const router = useRouter();
	const path = router.pathname;
	return (
		<div className="flex justify-center  shadow-sm bg-slate-700 " role="group">
			<div className="bg-slate-700  my-2 rounded-xl">
				<Link
					href="/trafic/erlangb"
					type="button"
					className={
						(path == "/trafic/erlangb" ? "bg-green-700 " : "bg-gray-700 ") +
						" inline-flex text-center rounded-md hover:scale-105 md:w-48 mb-1  items-center py-1 w-28 pl-2.5 md:py-2 md:px-4 text-md font-normal text-gray-900 border mr-2  border-white dark:text-white "
					}
				>
					{" "}
				
					Erlang<span class="ml-2 text-red-600 font-bold"> B</span>
				</Link>
				
				<Link
					href="/trafic/engset"
					type="button"
					className={
						(path == "/trafic/engset" ? "bg-green-700 " : "bg-gray-700 ") +
						" inline-flex text-center rounded-md hover:scale-105 md:w-48 mb-1  items-center py-1 w-28 pl-2.5 md:py-2 md:px-4 text-md font-normal text-gray-900 border mr-2  border-white dark:text-white "
					}
				>
					{" "}
					
					Engset<span class="ml-2  text-red-600 font-bold"> # </span>
				</Link>
			</div>
		</div>
	);
};

export default SubmenuTrafic;
