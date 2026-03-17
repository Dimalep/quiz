import { useState } from "react";
import styles from "./ConnectInfo.module.css";
import { QRCodeSVG } from "qrcode.react";

export interface Props {
  sessionKey: string | undefined;
  url: string;
}

export default function ConnectInfo({ sessionKey, url }: Props) {
  const [isShowQr, setIsShowQr] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.session_info}>
        <div className={styles.session_key}>
          <h4>Код комнаты:</h4>
          <div className={styles.key}>
            <span>{sessionKey}</span>
          </div>
          <div
            className={styles.button_qr}
            onClick={() => setIsShowQr((prev) => !prev)}
          >
            QR
          </div>
        </div>
      </div>
      {isShowQr && (
        <div className={styles.qr}>
          <QRCodeSVG value={url} size={256}></QRCodeSVG>
        </div>
      )}
    </div>
  );
}
