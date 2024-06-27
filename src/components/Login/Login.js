import "./Login.css";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KisiListesi from "./KisiListesi";

function Login() {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(true);
  const [profil, setProfil] = useState("/signin");
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const check = () => {
    setChecked(!checked);
  };

  const onFinish = (values) => {
    const kisi = KisiListesi.find(
      (x) => x.email === values.email && x.password === values.password
    );

    if (kisi) {
      kisi.durum = true;
      navigate("/Home");
    } else {
      showModal();
    }
  };

  return (
    <div className="login">
      <div className="bg">
        <Form form={form} onFinish={onFinish}>
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
              name="password"
              rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
            >
              <Input placeholder="Şifrenizi giriniz" type="password" />
            </Form.Item>
          </div>

          <div className="girdi">
            <Checkbox checked={checked} onClick={check}>
              Beni hatırla
            </Checkbox>

            <Link to={profil}>
              <Button type="text" style={{color:'white'}}>Profil oluştur</Button>
            </Link>
          </div>

          <div className="mid">
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </div>
        </Form>
        <Modal
          className="custom-modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          centered
          width={300}
          closable={false}
        >
          <p>Yanlış email veya şifre</p>
          <Button type="primary" onClick={handleOk}>
            Tamam
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
