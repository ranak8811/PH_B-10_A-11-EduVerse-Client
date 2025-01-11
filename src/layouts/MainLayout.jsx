import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="w-full dark:bg-gray-900">
      <div>
        <nav className=" sticky top-0 z-10 bg-opacity-50 backdrop-blur-3xl">
          <Navbar></Navbar>
        </nav>
        <section>
          <Outlet></Outlet>
        </section>
        <section>
          <Footer></Footer>
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
