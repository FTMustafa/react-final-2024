import "./DefaulContent.css";

function DefaultContent() {
  return (
    <div className="default-content">
      <div className="heading">
        <h2>Soru Çözme</h2>
      </div>
      <div className="text">
        <p>
          Soru çözme sitesine hoşgeldiniz!
          <br />
          Burada kendinizi test edebilirsiniz.
        </p>
      </div>
      <div className="heading">
        <h3>Önemli bilgiler</h3>
      </div>
      <div className="text">
        <ul>
          <li>Soruları çözerek sınav puanınızı öğrenebilirsiniz.</li>
          <li>Her sınavın özel bir kodu olacaktır.</li>
          <li>Soruları 5:00 dk (beş dakika) içinde cevaplamalısınız.</li>
          <li>Her sayfada yalnızca bir soru görüntülenecektir ve geri dönülemez.</li>
          <li>4 yanlış cevap 1 doğru cevabı götürecektir.</li>
          <li>Her öğrenci bir sınava yalnızca bir kez katılabilir.</li>
        </ul>
      </div>
    </div>
  );
}

export default DefaultContent;
