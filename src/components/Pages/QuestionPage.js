import "./QuestionPage.css";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import KisiListesi from "../Login/KisiListesi";

function QuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [i, setI] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(location.state.ders.sorular[i - 1]);
  const [currentAnswer, setCurrentAnswer] = useState(location.state.ders.cevaplar[i - 1]);
  const [puan, setPuan] = useState(0);
  const [falseCounter, setFalseCounter] = useState(0);

  const [timeLeft, setTimeLeft] = useState(300);

  const hesapla = (index) => {
    let newPuan = puan;
    let newFalseCounter = falseCounter;

    if (location.state.ders.dogruCevap[i - 1] === currentAnswer[index].split(")")[0]) {
      newPuan += 10;
    } else {
      newFalseCounter += 1;
    }

    if (newFalseCounter % 4 === 0 && newFalseCounter > 0) {
      newPuan = Math.max(0, newPuan - 10);
    }

    setI(i + 1);
    setPuan(newPuan);
    setFalseCounter(newFalseCounter);

    if (i === 10) {
      const updatedDersListesi = user.dersListesi.map((exam) => {
        if (exam.code === location.state.ders.code) {
          return { ...exam, finished: true, result: newPuan };
        }
        return exam;
      });
      const updatedKisiListesi = KisiListesi.map((k) =>
        k.id === user.id ? { ...k, dersListesi: updatedDersListesi } : k
      );
      KisiListesi.splice(0, KisiListesi.length, ...updatedKisiListesi);

      navigate("/Home");
    } else {
      setCurrentQuestion(location.state.ders.sorular[i]);
      setCurrentAnswer(location.state.ders.cevaplar[i]);
    }
  };

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

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const updatedDersListesi = user.dersListesi.map((exam) => {
        if (exam.code === location.state.ders.code) {
          return { ...exam, finished: true, result: puan };
        }
        return exam;
      });
      const updatedKisiListesi = KisiListesi.map((k) =>
        k.id === user.id ? { ...k, dersListesi: updatedDersListesi } : k
      );
      KisiListesi.splice(0, KisiListesi.length, ...updatedKisiListesi);
      navigate("/Home");
    }
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="question-page">
      <div className="timer">{formatTime(timeLeft)}</div>
      <div className="soru">{currentQuestion}</div>
      <div className="cevaplar">
        {currentAnswer.map((cevap, index) => (
          <div key={index} className="cevap" onClick={() => hesapla(index)}>
            {cevap}
          </div>
        ))}
      </div>
      {/* <Button onClick={() => navigate("/home")}>Geri Dön</Button> */}
    </div>
  );
}

export default QuestionPage;
