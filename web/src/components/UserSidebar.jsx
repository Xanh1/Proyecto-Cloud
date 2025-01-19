import Link from "next/link";

import Cookies from "js-cookie";

export default function UserSidebar() {
  
  const logout = (e) => {
    Cookies.remove("token");
    Cookies.remove("usuario");
    Cookies.remove("necesary");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
       

        <ul className="mt-auto space-y-2 font-medium">
          <li>
            <Link
              href="/session"
              className="flex font-medium items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <span onClick={logout} className="flex-1 ms-3 whitespace-nowrap">
                Cerrar Sesión
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}