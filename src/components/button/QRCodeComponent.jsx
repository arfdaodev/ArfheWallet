import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ address }) => {
  if (!address) return <p>Adres bulunamadı</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "1px" }}>
      <p style={{ fontWeight: "bold" }}>{}</p>
      <QRCodeCanvas value={address} size={250} />
    </div>
  );
};

export default QRCodeComponent;
