import Link from "next/link";
import Image from "next/image";

export default function Userbar() {

    return (
        <aside className="h-full flex flex-col justify-between items-center py-4 px-2">
            <Link href="/person/modify" className="rounded-full">
                <Image src="/user.png" width={32} height={32} alt="A user image" />
            </Link>
            <Link
                href="/session"
                className="p-2 rounded-full ease-in duration-300 hover:shadow-md hover:scale-110"
            >
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
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
                        <path
                            d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </Link>
        </aside>
    );
}