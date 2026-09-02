import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

import { Profile } from "./user/Profile";
import { Settings } from "./user/Settings";
import { Items } from "./Items";

import { ReactComponent as UserImg } from "../../images/SVG/user.svg";
import { ReactComponent as BoxImg } from "../../images/SVG/box.svg";
import { ReactComponent as CogImg } from "../../images/SVG/cog.svg";
import { ReactComponent as LogOutImg } from "../../images/SVG/log-out.svg";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const makeFirstLetterCapital = (str) => {
    const withoutFirstLetter = str.substring(1);
    const updated = str.charAt(0).toUpperCase().concat(withoutFirstLetter);

    return updated;
  };

  if (!auth.isAuthenticated) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar__welcome">
          Welcome, {makeFirstLetterCapital(auth.user.username)}!
        </div>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/dashboard">
              <BoxImg fill="#eee" />
              <span>Items</span>
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/dashboard/profile">
              <UserImg fill="#eee" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/dashboard/settings">
              <CogImg fill="#eee" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="sidebar__item">
            <button
              className="sidebar__logout"
              onClick={() => dispatch(logout())}
            >
              <LogOutImg fill="#eee" />
              <span>Log out</span>
            </button>
          </li>
        </ul>
        <div className="copyright">
          &copy; 2024, Inventory Management App by Aryman Gupta
        </div>
      </div>
      <div className="main">
        <Switch>
          <Route
            path="/dashboard/profile"
            render={() => (
              <Profile makeFirstLetterCapital={makeFirstLetterCapital} />
            )}
          />
          <Route path="/dashboard/settings" render={() => <Settings />} />
          <Route path="/dashboard" render={() => <Items />} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
