import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { removeUser } from "../core/userSlice";
import { BASE_URL } from "../utils/constants";

function NavBar() {
  const user = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { witcredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigation("/login");
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center">
          Welcome {user.firstName}
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
