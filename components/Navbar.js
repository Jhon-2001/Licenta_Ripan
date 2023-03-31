/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownRender from "./Dropdown";

// import { DataContext } from '../store/GlobalState';
// import Cookie from 'js-cookie';
function NavBar() {
	// const { state, dispatch } = useContext(DataContext);
	// const { auth } = state;
	// const [ color, setColor] = useState('')

	const router = useRouter();
	const path = router.pathname;

	// const Root = () => {
	// 	return (
	// 		<Link href="/admin2">
	// 			<a className="text-red-500 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium">
	// 				Admin Area{" "}
	// 			</a>
	// 		</Link>
	// 	);
	// };
	// const RootDropDown = () => {
	// 	return (
	// 		<Link href="/admin2">
	// 			<a className="text-red-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
	// 				Admin Area
	// 			</a>
	// 		</Link>
	// 	);
	// };
	// const handleLogout = async (e) => {
	// 	e.preventDefault();
	// 	Cookie.remove("refreshtoken", { path: "api/accessToken" });
	// 	localStorage.removeItem("firstLogin");
	// 	await dispatch({ type: "AUTH", payload: {} });
	// 	await dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
	// 	window.location.reload(false);
	// 	return router.push("/");
	// };
	// const loggedRoutermobile = () => {
	// 	return (
	// 		<>
	// 			{" "}
	// 			{auth.user.role === "admin" && RootDropDown()}
	// 			<Link href="/admin">
	// 				<a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
	// 					Adauga Sd
	// 				</a>
	// 			</Link>
	{
		/* <Link href="/admin2">
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Admin Area
          </a>
        </Link> */
	}
	// </>
	// );
	// };
	// const loggedRouter = () => {
	//   return (
	//     <>{
	//       auth.user.role === 'admin' && Root()
	//     }
	//       <Link href="/admin">
	//         <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium">
	//           Adauga Sd
	//         </a>
	//       </Link>

	//     </>
	//   );
	// };

	// const login = () => {
	//   return (
	//     <>
	//       <p
	//         style={{ textTransform: 'capitalize' }}
	//         className=" text-gray-300 hover:bg-gray-500 hover:text-white px-1 py-2 rounded-md text-md font-medium">
	//         {auth.user.nume} {auth.user.prenume}
	//       </p>

	//       <button
	//         onClick={handleLogout}
	//         className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-md font-medium">
	//         Logout
	//       </button>
	//     </>
	//   );
	// };
	return (
		<div>
			<nav className="bg-gray-800 ">
				<div className=" max-w-7xl mx-auto pl-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
						<div className="md:hidden ">
							{" "}
							<div className=""></div> <DropdownRender />
						</div>
						<div
							className="md:hidden
grow"
						></div>
						<div className="flex-shrink-1 flex items-center">
							<Link
								href="https://www.armyacademy.ro/"
								type="button"
								className="bg-gray-800 flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
								id="user-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								target="_black"
							>
								<span className="sr-only">Open user menu</span>
								<img className="h-12 w-12 rounded-full" src="\images\logo.png" alt=""></img>
							</Link>
						</div>
						<div className="pl-3 md:flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div id="mobile-menu" className="hidden md:block sm:ml-6 -mr-10">
								<div className="flex md:space-x-3 space-x-1">
									<Link
										href="/"
										className={
											(path == "/" ? "bg-green-700 " : "bg-gray-700 ") +
											"flex text-md border-2 hover:scale-105 border-sky-900 text-white text-center px-3 py-2 rounded-md  font-medium"
										}
										aria-current="page"
									>
										Ghid Utilizare Aplicatie
										<img
											className="ml-2 -mb-4 pb-4 h-10 w-8"
											src="\icons\network.svg"
											alt="rad"
										></img>
									</Link>
									{/* {Object.keys(auth).length === 0 ? <></> : loggedRouter()} */}
									<Link
										href="/manager"
										className={
											(path.includes("manager") ? "bg-green-700 " : "bg-gray-700 ") +
											"flex text-center w-36 text-md border-2 hover:scale-105  border-sky-900 text-white pl-3 py-2 rounded-md  font-medium"
										}
									>
										Manager RF
										<img
											className="-mr-2 -mb-4 pb-3 h-10 w-12 "
											src="\icons\svgmanager.svg"
											alt="rad"
										></img>
									</Link>
									<Link
										href="/trafic"
										className={
											(path.includes("trafic") ? "bg-green-700 " : "bg-gray-700 ") +
											"flex w-36 text-md border-2 hover:scale-105 border-sky-900 text-white pl-3 py-2 rounded-md  font-medium"
										}
									>
										Trafic Date
										<img
											className="ml-2 -mb-4 pb-4 h-10 w-8 text-white-200"
											src="\icons\traffic.svg"
											alt="rad"
										></img>
									</Link>
									<div className="grow"></div>

									<Link
										href="/login"
										className={
											(path == "/login" ? "bg-green-700 " : "bg-gray-700 ") +
											"bg-gray-700 flex text-md border-2 hover:scale-105 border-sky-900 text-white  py-2 rounded-md px-4 font-medium"
										}
									>
										Login
										<img
											className="ml-2 -mr-3 -mb-4 pb-4 h-10 w-8 text-white-200"
											src="\icons\user.svg"
											alt="rad"
										></img>
									</Link>
								</div>
							</div>
						</div>
						<div className="static inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<div className="ml-3 relative">
								<div>
									<button
										type="button"
										className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
									>
										<span className="sr-only">Open user menu</span>
									</button>
								</div>
							</div>
							{/* {Object.keys(auth).length === 0 ? (
                <>
                <Link  href="/login">
                  <a
                   
                    className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-md font-medium">
                    Login
                  </a>
                  </Link>
                </>
               
              ) : (
                login()
              )} */}
							<div className="relative"></div>
						</div>
					</div>
				</div>
				{/* 
				<div className="md:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							href="/"
							className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
							aria-current="page"
						>
							Planificare Retele{" "}
						</Link>
						{Object.keys(auth).length === 0 ? <></> : loggedRoutermobile()}

						<Link
							href="/manager"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Manager RF
						</Link>
						<Link
							href="/trafic"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Trafic Date
						</Link>
					</div>
				</div> */}
			</nav>
		</div>
	);
}
export default NavBar;
