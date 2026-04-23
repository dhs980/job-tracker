import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./Home";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Login from "./Login";
import OauthSuccess from "./OauthSuccess";
import { AuthProvider } from "../context/AuthContext";
import NotLoggedIn from "./NotLoggedIn";
import { DisplayJobs } from "./DisplayJobs";
import DashBoard from "./DashBoard";

function Layout() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth-success" element={<OauthSuccess />} />
            <Route
              path="/app"
              element={
                <NotLoggedIn>
                  <DisplayJobs />
                </NotLoggedIn>
              }
            />
            <Route
              path="/dashboard"
              element={
                <NotLoggedIn>
                  <DashBoard />
                </NotLoggedIn>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
