import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="w-full dark:bg-black">
      <div className="container mx-auto">
        <nav className=" sticky top-0 z-10 bg-opacity-50 backdrop-blur-3xl">
          <Navbar></Navbar>
        </nav>
        <section>
          <Outlet></Outlet>
        </section>
        {/* <section>
          <Footer></Footer>
        </section> */}
      </div>
    </div>
  );
};

export default MainLayout;
