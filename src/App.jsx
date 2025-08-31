import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./app/components/Body";
import Login from "./app/components/Login";
import Profile from "./app/components/Profile";
import Feed from "./app/components/Feed";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
