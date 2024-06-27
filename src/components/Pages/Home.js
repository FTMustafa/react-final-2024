import "./Home.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import KisiListesi from "../Login/KisiListesi";
import { useState } from "react";

function Home() {
  const [user] = useState(KisiListesi.find((x) => x.durum === true));
  const userString = JSON.stringify(user.email);
  const navigate = useNavigate();

  const back = () => {
    user.durum = false;
    navigate("/login");
  };

  return (
    <div className="a">
      <div className="navbar">
        <div className="mail-box" onClick={() => navigate("/Home")}>
          {userString.split('"')}
        </div>
        <div className="menu">
          <Link to="profile">
            <Button style={{ width: "220px", height: "40px" }}>Profile</Button>
          </Link>
          <Link to="exams">
            <Button style={{ width: "220px", height: "40px" }}>Exams</Button>
          </Link>
          <Link to="results">
            <Button style={{ width: "220px", height: "40px" }}>Results</Button>
          </Link>
        </div>
        <div className="exit">
          <Button onClick={back} style={{ width: "220px", height: "40px" }}>
            Exit
          </Button>
        </div>
      </div>
      <div className="var-page">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
