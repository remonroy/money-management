import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logout } from "../store/actions/authAction";

const Home = (props) => {
  const state = useSelector((state) => state.auth);
  return (
    <div className="row">
      <div className="col-md-6 ">
        <img
          style={{ width: "70%", height: "70%" }}
          src="https://res.cloudinary.com/bangla-company/image/upload/v1641724206/twinkls%20cats/images_dypsug.jpg"
          alt=""
        />
      </div>
      <div style={{ transform: "translateY(25%)" }} className="col-md-6">
        <a href="/dashboard" className="btn btn-primary mt-5">
          Dashboard
        </a>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Home);
