import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import React, { useContext } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import ContactUs from "./components/contactus/ContactUs";
import Header from "./components/style/Header";
import LogIn from "./components/registration/LogIn";
import Footer from "./components/style/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import SignUp from "./components/registration/SignUp";
import BookDetailsPage from "./components/BookDetails/BookDetailsPage";
import HomePage from "./components/homepage/HomePage";
import SearchResult from "./components/homepage/SearchResult";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import TermCondition from "./components/TermCondition/TermCondition";
import NotFound from "./components/NotFoundPage/NotFound";
import ReportManager from "./components/ReportManager/ReportManager";
import ResetLink from "./components/registration/ResetPassword";
import AuthContext from "./components/context/auth-context";
import Library from "./components/BookShelf/Library";
import Wishlist from "./components/BookShelf/Wishlist";
import ManageWishlist from "./components/BookShelf/ManageWishlist";
import ManageLibrary from "./components/BookShelf/ManageLibrary";
import SignUpAdmin from "./components/registration/SignUpAdmin";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
          <Route path="/contact-us">
            <ContactUs />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/login">
            {!authCtx.isLoggedIn && !authCtx.adminLoggedIn && <LogIn />}
            {authCtx.isLoggedIn && <Redirect to="/" />}
            {authCtx.isLoggedIn && authCtx.adminLoggedIn && <Redirect to="/" />}
            {authCtx.adminLoggedIn && <Redirect to="/report-admin" />}
          </Route>
          <Route path="/signup">
            {!authCtx.isLoggedIn && !authCtx.adminLoggedIn && <SignUp />}
            {authCtx.isLoggedIn && <Redirect to="/" />}
            {authCtx.isLoggedIn && authCtx.adminLoggedIn && <Redirect to="/" />}
          </Route>
          {authCtx.adminLoggedIn && (
            <Route path="/signupadmin">
              <SignUpAdmin />
            </Route>
          )}
          <Route path="/reset-password">
            <ResetLink />
          </Route>
          <Route exact path="/details/:id">
            <BookDetailsPage
              userType={authCtx.userTypes}
              userId={authCtx.userIdInfo}
            />
          </Route>
          <Route exact path="/library">
            {authCtx.isLoggedIn && <Library userId={authCtx.userIdInfo} />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
            {authCtx.adminLoggedIn && <Redirect to="/report-admin" />}
          </Route>
          <Route exact path="/library/manage">
            {authCtx.isLoggedIn && (
              <ManageLibrary userId={authCtx.userIdInfo} />
            )}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
            {authCtx.adminLoggedIn && <Redirect to="/report-admin" />}
          </Route>
          <Route exact path="/wish-list">
            {authCtx.isLoggedIn && <Wishlist userId={authCtx.userIdInfo} />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
            {authCtx.adminLoggedIn && <Redirect to="/report-admin" />}
          </Route>
          <Route exact path="/wishlist/manage">
            {authCtx.isLoggedIn && (
              <ManageWishlist userId={authCtx.userIdInfo} />
            )}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
            {authCtx.adminLoggedIn && <Redirect to="/report-admin" />}
          </Route>
          <Route path="/profile">
            {authCtx.isLoggedIn && <ProfilePage />}
            {!authCtx.isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/resetpassword">
            {authCtx.isLoggedIn && <ResetPassword />}
            {!authCtx.isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route exact path="/report-admin">
            {authCtx.isLoggedIn && authCtx.adminLoggedIn && <ReportManager />}
            {authCtx.isLoggedIn && !authCtx.adminLoggedIn && (
              <Redirect to="/" />
            )}
            {!authCtx.isLoggedIn && !authCtx.adminLoggedIn && (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/terms">
            <TermCondition />
          </Route>
          <Route path="">
            <NotFound />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
