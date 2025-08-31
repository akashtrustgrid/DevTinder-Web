import { Outlet, Routes } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Body() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
