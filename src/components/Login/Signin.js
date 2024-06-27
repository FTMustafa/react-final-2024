import "./Signin.css";
import { Form, Input, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import KisiListesi from "./KisiListesi";
import { useState } from "react";
import SinavListesi from "../Pages/SinavListesi";

let currentID = 0;

class Kisi {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.durum = false;
    this.profilePhoto = null;
    this.id = currentID++;
    this.dersListesi = SinavListesi;
    this.ad='-------';
    this.soyad='-------';
  }
}

function Signin() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (mesaj) => {
    setModalMessage(mesaj);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    if ((values.password1 == values.password2) & (values.email != null)) {
      const kisi = new Kisi(values.email, values.password1);
      if (
        !KisiListesi.includes(KisiListesi.find((x) => x.email == values.email))
      ) {
        KisiListesi.push(kisi);
        console.log(KisiListesi);
        navigate("/login");
      } else {
        showModal("Kişi zaten kayıtlı!");
      }
    } else {
      showModal("Şifreler farklı!");
    }
  };

  return (
    <div className="b">
      <div className="bg">
        <Form onFinish={onFinish}>
          <div className="girdi">
            <label>E-mail</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Lütfen emailinizi giriniz!" },
              ]}
            >
              <Input
                inputMode="email"
                placeholder="E-mailinizi giriniz"
                type="email"
              />
            </Form.Item>
          </div>
          <div className="girdi">
            <label>Şifre</label>
            <Form.Item
              name="password1"
              rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
            >
              <Input placeholder="Şifrenizi giriniz" type="password" />
            </Form.Item>
          </div>
          <div className="girdi">
            <label>Şifre tekrarı</label>
            <Form.Item
              name="password2"
              rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
            >
              <Input placeholder="Şifrenizi tekrar giriniz" type="password" />
            </Form.Item>
          </div>

          <div className="mid2">
            <Link to={"/login"}>
              <Button type="default">Geri dön</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Kayıt Ol
            </Button>
          </div>
        </Form>
        <Modal
          className="custom-modal"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          centered
          width={300}
          closable={false}
        >
          <p>{modalMessage}</p>
          <Button type="primary" onClick={handleOk}>
            Tamam
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default Signin;
