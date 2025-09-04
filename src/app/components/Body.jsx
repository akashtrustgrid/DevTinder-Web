import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../core/userSlice";
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
    if (!user) {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        if (res.data.data) {
          dispatch(addUser(res.data.data));
        }
      } catch (error) {
        navigation("/login");
        console.error("ERROR:" + error);
      }
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
