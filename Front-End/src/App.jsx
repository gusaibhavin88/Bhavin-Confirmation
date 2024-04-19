import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/home/home";
import PageNotFound from "./components/pages/pageNotFound/pageNotFound";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard/dashboard";
import { PrivateRoute } from "./components/common/PrivateRoute";
import ProfilePage from "./components/profilePage/profilePage";
import UserData from "./components/userData/userData";
import Auth from "./components/pages/auth/auth";
import ChangePassword from "./components/changePassword/changePassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RedirectPage from "./components/redirectPage/redirectPage";
import UsersTable from "./components/users/users";
import TestPage from "./components/redirectPage/testPage";
import VerifyPage from "./components/verifyPage/verifyPage";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route exact path="/signin" element={<Auth />} />
          <Route exact path="/" element={<RedirectPage />} />
          <Route exact path="/admin" element={<RedirectPage />} />
          <Route exact path="/verify" element={<VerifyPage />} />
          <Route exact path="/test" element={<TestPage />} />
          <Route exact path="/admin" element={<RedirectPage />} />
          <Route exact path="/admin/signin" element={<Auth />} />
          <Route exact path="/signup" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<PrivateRoute />}>
            <Route
              exact
              path="/dashboard"
              element={
                <Home>
                  <Dashboard />
                </Home>
              }
            />
            <Route
              exact
              path="/admin/dashboard"
              element={
                <Home>
                  <Dashboard />
                </Home>
              }
            />
            <Route
              exact
              path="/admin/users"
              element={
                <Home>
                  <UsersTable />
                </Home>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <Home>
                  <ProfilePage />
                </Home>
              }
            />
            <Route
              exact
              path="/admin/profile"
              element={
                <Home>
                  <ProfilePage />
                </Home>
              }
            />
            <Route
              exact
              path="/admin/users"
              element={
                <Home>
                  <UserData />
                </Home>
              }
            />
            <Route
              exact
              path="/admin/change-password"
              element={
                <Home>
                  <ChangePassword />
                </Home>
              }
            />
            <Route
              exact
              path="/change-password"
              element={
                <Home>
                  <ChangePassword />
                </Home>
              }
            />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
