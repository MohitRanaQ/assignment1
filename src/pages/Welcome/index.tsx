/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcomePage">
      <nav>
        <Link to={"/login"}>Login</Link>
        <hr className="divider" />
        <Link to={"/dashboard"}>Dashboard</Link>
      </nav>
    </div>
  );
};

export default Welcome;
