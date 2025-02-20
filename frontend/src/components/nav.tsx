import Link from "next/link";
import Nav_Items from "../utils/nav_items";

function Navigation() {
    return (
        <nav className="grid h-[5rem] px-16 bg-zinc-950 grid-cols-3 items-center">
            <div className="text-2xl text-white select-none">
                <strong>Andreas |</strong> Skovsted
            </div>
            <div className="flex mx-auto justify-center">
            <Nav_Items />
            </div>
            <button className="bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 w-32 text-center ml-auto font-bold">
                <Link href="/login">Login</Link>
            </button>
        </nav>
    );
}

export default Navigation;
