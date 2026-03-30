import { NavLink } from "react-router-dom";
import logo from "../assets/logo/ellicalogo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.24em] transition",
    isActive ? "text-orange-500" : "text-white/60 hover:text-orange-400",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0b0b0b]/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between px-9 py-6">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-17" />
        </NavLink>

        <nav className="flex items-center gap-6 ml-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
