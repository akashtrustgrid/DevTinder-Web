import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../core/userSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";

function Body() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(login(res.data));
      }
    } catch (error) {
      navigation("/login");
      console.error("ERROR:" + error);
    }
  };

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
