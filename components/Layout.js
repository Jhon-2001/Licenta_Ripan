// import Notify from './Notify';
import NavBar from "./Navbar";
import React from "react";
import Notify from "./Notify";
import Footer from "./Footer"

export default function Layout({ children }) {
	return (
		<div>
			<Notify />
			<NavBar />
			{children}
	    <Footer />
		</div>
	);
}
