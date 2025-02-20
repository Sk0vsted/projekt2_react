import Link from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" }
];

function Nav_Items() {
    return (
        <>
            {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="hover:text-indigo-400 text-lg mx-8 text-white">
                    {item.label}
                </Link>
            ))}
        </>
    );
}

export default Nav_Items;
