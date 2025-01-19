import Link from "next/link";

export default function HeaderCliente() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link href="/" className="flex ms-2 md:me-24">
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
                O2M
              </span>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/extrapolacion">
              <div className="flex space-x-4">
                <button className="btn relative block w-full font-medium inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
                  <span className="w-56 h-48 rounded bg-gray-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out text-black group-hover:text-white">
                    Predicciones
                  </span>
                </button>
              </div>
            </Link>
            <Link href="/graphic">
              <div className="flex space-x-4">
                <button className="btn relative block w-full font-medium inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
                  <span className="w-56 h-48 rounded bg-gray-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out text-black group-hover:text-white">
                    Monitoreo
                  </span>
                </button>
              </div>
            </Link>
            <Link href="/session">
              <div className="flex space-x-4">
                <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
                  <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out text-blue-500 group-hover:text-white">
                    Iniciar Sesión
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}