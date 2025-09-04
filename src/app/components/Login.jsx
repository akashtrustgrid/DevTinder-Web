import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../core/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (errorMessage === "") return;
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.data) {
        setErrorMessage("Login successful!");
        dispatch(addUser(res.data.data));
        navigation("/");
      }
    } catch (error) {
      console.error("ERROR:" + error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.data) {
        setErrorMessage("Your account has been created successful!");
        dispatch(addUser(res.data.data));
        navigation("/profile");
      }
    } catch (error) {
      console.error("ERROR:" + error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 bg-base-200 card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center my-2">
            {isLogin ? "Enter your credentials" : "Create your Account"}
          </h2>
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </>
          )}
          <label className="input validator my-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </div>
          <div className="justify-center card-actions">
            <button
              className="btn btn-primary mt-4 mx-3"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
        <p
          className="flex justify-center mb-6 cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
      {errorMessage !== "" && (
        <div className="toast toast-top toast-center my-15">
          <div
            className={`alert ${
              errorMessage.includes("ERROR") ? "alert-error" : "alert-success"
            }`}
          >
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
