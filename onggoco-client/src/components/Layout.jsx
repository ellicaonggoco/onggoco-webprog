import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <NavBar />
      <main className="pb-16 pt-24 px-4 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
