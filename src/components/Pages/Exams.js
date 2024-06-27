import React, { useState, useEffect } from "react";
import "./Exams.css";
import KisiListesi from "../Login/KisiListesi";
import { Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

function Exams() {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const kisi = KisiListesi.find((k) => k.durum === true);
    setUser(kisi);
    setExams(kisi.dersListesi);
  }, []);

  useEffect(() => {
    if (user && user.dersListesi) {
      setExams([...user.dersListesi]);
    }
  }, [user]);

  const handleClick = (index) => {
    const kisi = KisiListesi.find((k) => k.durum === true);
    const updatedExams = kisi.dersListesi.map((exam, i) =>
      i === index ? { ...exam, started: true, finished: false } : exam
    );
    const updatedKisiListesi = KisiListesi.map((k) =>
      k.id === user.id ? { ...k, dersListesi: updatedExams } : k
    );
    KisiListesi.splice(0, KisiListesi.length, ...updatedKisiListesi);

    setExams(updatedExams);

    const ders = kisi.dersListesi.find((k,i)=>i==index)
    console.log(ders);
    navigate("/question-page", { state: {ders} });
  };

  return (
    <div>
      {exams.map((sinav, index) => (
        <div className="class-box" key={index}>
          <div className="class-object-box">
            <h2>{sinav.name}</h2>
          </div>
          <div className="class-object-box">
            <p>{sinav.code}</p>
          </div>
          {sinav.started === false && sinav.finished === false ? (
            <div className="class-object-box">
              <Button
                onClick={() => handleClick(index)}
                style={{ width: 100, height: 60 }}
                type="primary"
              >
                Başla
              </Button>
            </div>
          ) : (
            <div className="class-object-box">
              <p>Sınava tekrar girilemez!</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Exams;
