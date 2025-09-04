import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./app/components/Body";
import Login from "./app/components/Login";
import Profile from "./app/components/Profile";
import Feed from "./app/components/Feed";
import Requests from "./app/components/Requests";
import Connections from "./app/components/Connections";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/connections" element={<Connections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
