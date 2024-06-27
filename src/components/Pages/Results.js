import "./Results.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KisiListesi from "../Login/KisiListesi";

function Results() {
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

  return (
    <div className="results">
      {exams.map((sinav, index) => (
        <div className="class-box" key={index}>
          <div className="class-object-box">
            <h2>{sinav.name}</h2>
          </div>
          <div className="class-object-box">
            <p>{sinav.code}</p>
          </div>
          {sinav.result != null ? (
            <div className="result">{sinav.result}</div>
          ) : (
            <div className="class-object-box">
              <p>Sınav henüz yapılmadı.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Results;
