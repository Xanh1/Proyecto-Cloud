import Link from "next/link";

import Cookies from "js-cookie";

export default function HeaderMenu() {
  

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/graphicMonitoring" className="flex ms-2 md:me-24">
              {/* <svg
                fill="#000000"
                width="32px"
                height="32px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="Natural_resources_sustainability">
                    {" "}
                    <path d="M382,359.36H122.5a14,14,0,1,1,0-27.93h31.59v-17H122.5a31,31,0,1,0,0,61.93H382a13.52,13.52,0,1,1,0,27H350.81v17H382a30.52,30.52,0,1,0,0-61Z"></path>{" "}
                    <rect
                      height="17"
                      width="57.84"
                      x="265.86"
                      y="403.39"
                    ></rect>{" "}
                    <path d="M163.09,274h28.62a59.19,59.19,0,0,1,5.94-18H163.09c-29.35,0-53.62-23.4-54.1-52.17a53.07,53.07,0,0,1,53.07-54l0-9,.1,9h.07a26.71,26.71,0,0,0,5.25-.54,37.11,37.11,0,0,1,10.05,25l20.34-.57a56.64,56.64,0,0,0-13.57-36,25.61,25.61,0,0,0,2.87-6.41,69.33,69.33,0,0,1,133.12,0,25.71,25.71,0,0,0,24.92,18.6h.21a53.07,53.07,0,0,1,53.07,54,51.52,51.52,0,0,1-5,21.39,59.11,59.11,0,0,1,16.62,6.92,69.38,69.38,0,0,0,6.42-28,71.08,71.08,0,0,0-71.07-72.29h-.19a7.85,7.85,0,0,1-7.65-5.63,87.34,87.34,0,0,0-167.7,0,7.86,7.86,0,0,1-7.7,5.63h-.14A71.08,71.08,0,0,0,91,204.14C91.63,242.67,124,274,163.09,274Z"></path>{" "}
                    <path d="M366.43,229.05a54.55,54.55,0,0,0-103.78,3,11.74,11.74,0,0,1-11.38,8.43h-.1a43.24,43.24,0,0,0-43.23,44c.4,23.7,20.23,42.49,43.94,42.49H378.17c23.71,0,43.54-18.79,43.94-42.49a43.24,43.24,0,0,0-41.3-43.93,32.92,32.92,0,0,0-13.35,26.05l-18-.51A50.22,50.22,0,0,1,366.43,229.05Z"></path>{" "}
                  </g>{" "}
                </g>
              </svg> */}
              <svg
                width="32px"
                height="32px"
                viewBox="-1.6 -1.6 19.21 19.21"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                transform="rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    color="#000000"
                    d="M13.41 4.002a2.491 2.491 0 0 0-1.816.89c-.46.514.34 1.186.766.643a1.495 1.495 0 0 1 1.822-.375c.623.313.946 1.007.785 1.686A1.495 1.495 0 0 1 13.508 8H1.5C.678 8 0 8.678 0 9.5a1.508 1.508 0 0 0 1.51 1.502h9.01c.235 0 .432.155.487.383a.495.495 0 0 1-.262.562.495.495 0 0 1-.608-.125c-.425-.542-1.226.13-.765.643a1.499 1.499 0 0 0 1.822.377c.619-.31.945-1.014.785-1.688a1.489 1.489 0 0 0-1.293-1.123.5.5 0 0 0-.174-.029h-9.01V10a.493.493 0 0 1-.5-.5c0-.282.218-.5.5-.5H13.51a.506.506 0 0 0 .1-.008 2.502 2.502 0 0 0 2.334-1.916 2.504 2.504 0 0 0-1.31-2.81 2.496 2.496 0 0 0-1.221-.264zm-4.705.01a1.497 1.497 0 0 0-1.338.523c-.46.513.34 1.186.766.643.15-.18.398-.23.607-.125.21.105.316.334.262.562A.495.495 0 0 1 8.516 6h-5.01c-.676-.01-.676 1.01 0 1h5.01c.055 0 .11-.009.162-.027a1.492 1.492 0 0 0 1.295-1.127 1.503 1.503 0 0 0-1.27-1.834z"
                    fill="black"
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                      lineHeight: "normal",
                      fontVariantLigatures: "normal",
                      fontVariantPosition: "normal",
                      fontVariantCaps: "normal",
                      fontVariantNumeric: "normal",
                      fontVariantAlternates: "normal",
                      fontFeatureSettings: "normal",
                      textIndent: 0,
                      textAlign: "start",
                      textDecorationLine: "none",
                      textDecorationStyle: "solid",
                      textDecorationColor: "#000000",
                      textTransform: "none",
                      textOrientation: "mixed",
                      shapePadding: 0,
                      isolation: "auto",
                      mixBlendMode: "normal",
                      whiteSpace: "normal",
                    }}
                  />
                </g>
              </svg>
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                Servicio de denuncias municipales
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}