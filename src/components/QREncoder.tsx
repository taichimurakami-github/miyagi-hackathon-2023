import { useRef, useState } from "react";
import jsQR from "jsqr";
import QRCode from "react-qr-code";

export default function QREncoder(props: {
  onLoaded: (value: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const qrcodeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));

  const [qrValue, setQrValue] = useState<null | string>(null);
  const detecting = useRef(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const drawImagesFromMediaDevice = () => {
    if (canvasRef.current && !detecting.current) {
      const v = videoRef.current;
      const userMedia = { video: { facingMode: "environment" } };
      navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
        v.srcObject = stream;
        v.setAttribute("playsinline", "true");
        v.play();
        startTick();
      });
    }

    setShowCanvas(!detecting.current);
    detecting.current = !detecting.current;
  };

  const drawRect = (location: any) => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      console.log("E_NO_CONTEXT");
      return;
    }

    const drawLine = (begin: any, end: any) => {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#FF3B58";
      ctx.beginPath();
      ctx.moveTo(begin.x, begin.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    };
    drawLine(location.topLeftCorner, location.topRightCorner);
    drawLine(location.topRightCorner, location.bottomRightCorner);
    drawLine(location.bottomRightCorner, location.bottomLeftCorner);
    drawLine(location.bottomLeftCorner, location.topLeftCorner);
  };

  const startTick = () => {
    const c = canvasRef.current;
    const v = videoRef.current;
    const m = msgRef.current;
    // console.log(c, v, m);

    if (!c || !v || !m) {
      console.log("E_NO_ELEM");
      return;
    }

    if (qrValue) {
      return;
    }

    const ctx = c.getContext("2d");

    if (v.readyState === v.HAVE_ENOUGH_DATA && ctx) {
      c.height = v.videoHeight;
      c.width = v.videoWidth;
      ctx.drawImage(v, 0, 0, c.width, c.height);

      const img = ctx?.getImageData(0, 0, c.width, c.height);

      if (img) {
        const code = jsQR(img.data, img.width, img.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          console.log(code);

          drawRect(code.location); // Rect
          m.innerText = code.data; // Data
          setQrValue(code.data);
        }
      }
    }

    !qrValue && detecting.current && setTimeout(startTick, 20);
  };

  return (
    <div>
      <h1>jsQR</h1>
      <div id="wrapper">
        <div id="msg" ref={msgRef}>
          {!showCanvas
            ? "Unable to access video stream."
            : qrValue
            ? "qr code detected."
            : "Detecting QR-Code..."}
        </div>
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ visibility: showCanvas ? "visible" : "hidden" }}
        ></canvas>
        <div id="qrcode" ref={qrcodeRef}></div>
        {qrValue && <QRCode value={qrValue} size={512} />}
        <button onClick={drawImagesFromMediaDevice}>start media device</button>
      </div>
    </div>
  );
}
