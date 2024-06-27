import React, { useRef, useState, useEffect } from "react";
import KisiListesi from "../Login/KisiListesi";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Button, Input, Form } from "antd";

import "./Profile.css";

function Profile() {
  const [path, setPath] = useState(null);
  const [user, setUser] = useState(null);
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const kisi = KisiListesi.find((k) => k.durum === true);
    if (kisi) {
      setUser(kisi);
      setPath(kisi.profilePhoto);
      setAd(kisi.ad);
      setSoyad(kisi.soyad);
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    if (values.ad) {
      setAd(values.ad);
      user.ad = values.ad;
    }
    if (values.soyad) {
      setSoyad(values.soyad);
      user.soyad = values.soyad;
    }
  };

  const updatePhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const ppUrl = reader.result;
      setPath(ppUrl);

      const updatedKisiListesi = KisiListesi.map((k) =>
        k.id === user.id ? { ...k, profilePhoto: ppUrl } : k
      );

      // İlk elemandan son elemana kadar sil, ardından yeni listeyi listeye ekle
      KisiListesi.splice(0, KisiListesi.length, ...updatedKisiListesi);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-top-side">
        <div className="pp-box">
          <div className="pp">
            <button onClick={handleClick}>
              {path ? <img src={path} alt="Profile Picture" /> : "Upload Photo"}
              <input
                type="file"
                ref={fileInputRef}
                onChange={updatePhoto}
                style={{ display: "none" }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="profile-bottom-side">
        <div>
          <h3>E-mail</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Ad</h3>
          <p>{ad}</p>
        </div>
        <div>
          <h3>Soyad</h3>
          <p>{soyad}</p>
        </div>
        <Button icon={<EditOutlined />} onClick={showModal} />
      </div>

      <div className="edit"></div>
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
        <div>
          <Form onFinish={onFinish}>
            <div className="wide">
              <div>
                <label>Ad</label>
                <Form.Item name="ad">
                  <Input placeholder="Yeni ad giriniz" />
                </Form.Item>
              </div>
              <div>
                <label>Soyad</label>
                <Form.Item name="soyad">
                  <Input placeholder="Yeni soyad giriniz" />
                </Form.Item>
              </div>
            </div>
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              Kaydet
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
