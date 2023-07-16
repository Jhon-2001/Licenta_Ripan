import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

export default function SubmenuManager() {
  const router = useRouter();
	const path = router.pathname;
  
  return (
    <div
    className="flex  justify-center shadow-2xl bg-slate-700 "
    role="group"
  >
    <div className="bg-slate-700 text-center md:my-2 my-1 rounded-xl">
      <Link
        href="/manager"
        type="button"
        className={
          (path == '/manager'
            ? "bg-green-700 "
            : "bg-gray-700 ") +
            " inline-flex text-center rounded-md hover:scale-105 md:w-48 mb-1 w-2/5 items-center py-1  pl-2.5 md:py-2 md:px-4 text-sm font-normal text-gray-900 border mr-2  border-white dark:text-white "
          }	>        <svg
          aria-hidden="true"
          className="mr-2 md:w-4 hidden md:block h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
            clipRule="evenodd"
          ></path>
        </svg>
         Lista Frevente
      </Link>
      <Link
        href="/manager/procesare"
        type="button"
        className={
          (path == '/manager/procesare'
            ? "bg-green-700 "
            : "bg-gray-700 ") +
            " inline-flex text-center rounded-md hover:scale-105 md:w-48  w-2/5 items-center py-1  pl-2 md:py-2 md:px-4 text-sm font-normal text-gray-900 border mr-2  border-white dark:text-white "
        }
      >
        <svg
          aria-hidden="true"
          className="mr-2 md:w-4 hidden md:block h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
        </svg>
        Procesare_Freq
      </Link>
      <Link 
        href='/manager/seturifreq'
        className={
          (path == '/manager/seturifreq'
            ? "bg-green-700 "
            : "bg-gray-700 ") +
            " inline-flex  text-center rounded-md hover:scale-105 md:w-48   w-2/5 items-center py-1  pl-1.5 md:py-2 md:px-4 text-sm font-normal text-gray-900 border mr-2  border-white dark:text-white "
          }	>
        <svg
          aria-hidden="true"
          className="mr-2 md:w-4 hidden md:block h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
            clipRule="evenodd"
          ></path>
        </svg>
        Seturi Frecvente
      </Link>
      <Link 
        href='/manager/armonici'
        className={
          (path == '/manager/armonici'
            ? "bg-green-700 "
            : "bg-gray-700 ") +
            " inline-flex text-center rounded-md whitespace-nowrap hover:scale-105 md:w-40 w-2/5 items-center py-1  pl-1.5 md:py-2 pr-1 text-sm font-normal text-gray-900 border mr-2  border-white dark:text-white "
          }	>
         <svg
          aria-hidden="true"
          className="mr-2 md:w-4  hidden md:block h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
            clipRule="evenodd"
          ></path>
        </svg>
      Canale Interferență
      </Link>
    </div>
  </div>
  )
}
