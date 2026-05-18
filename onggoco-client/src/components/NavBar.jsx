import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/ellicalogo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-4 py-2 text-[15px] font-bold uppercase tracking-[0.24em] transition",
    isActive ? "text-[#ff6b00]" : "text-white/60 hover:text-[#ff6b00]",
  ].join(" ");

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");
    navigate("/auth/signin");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0b0b0b]/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between px-9 py-6">
        <NavLink to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto transition-transform hover:scale-105"
          />
        </NavLink>

        <nav className="flex items-center gap-8 ml-auto">
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

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-8 py-3 rounded-full border border-[#ff6b00] text-[#ff6b00] text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#ff6b00] hover:text-white active:scale-95"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/auth/signin">
              <button className="ml-4 px-8 py-3 rounded-full border border-[#ff6b00] text-[#ff6b00] text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#ff6b00] hover:text-white active:scale-95">
                Log In
              </button>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
