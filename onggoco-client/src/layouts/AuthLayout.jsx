import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/logo/ellicalogo.png";
import image from "../assets/logo/image.avif";

const AuthLayout = () => {
  return (
    <section className="relative min-h-screen bg-[#0b0b0b] text-white">
      <div className="absolute left-3 top-3 z-50">
        <img
          src={logo}
          alt="Logo"
          className="h-30 w-auto transition hover:opacity-80"
        />
      </div>

      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        {/* Left Side: Full-bleed image with new linear gradient for depth */}
        <div className="relative flex items-center justify-center border-b border-white/10 bg-zinc-950 lg:border-b-0 lg:border-r lg:border-white/10 overflow-hidden">
          <img
            src={image}
            alt="Visual"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent"></div>
        </div>

        <main className="relative flex items-center px-6 py-10 sm:px-10 lg:px-16 bg-[#0b0b0b]">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ff6b00]/15 via-[#0b0b0b] to-[#0b0b0b]"></div>

          <div className="relative z-10 mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
