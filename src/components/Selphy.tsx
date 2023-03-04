import { useRef, useState } from "react";
import jsQR from "jsqr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faRotateRight } from "@fortawesome/free-solid-svg-icons";
// import QRCode from "react-qr-code";

export default function Selphy(props: { onLoaded: (value: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  // const qrcodeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));

  // const [qrValue, setQrValue] = useState<null | string>(null);
  const detecting = useRef(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [shotDone, setShotDone] = useState(false);

  const drawImagesFromMediaDevice = () => {
    if (canvasRef.current && !detecting.current) {
      const v = videoRef.current;
      const userMedia = { video: { facingMode: "user" } };
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

    if (!c || !v || !m) {
      console.log("E_NO_ELEM");
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
          // setQrValue(code.data);
          props.onLoaded(code.data);
        }
      }
    }

    detecting.current && setTimeout(startTick, 20);
  };

  return (
    <div className="grid gap-10 mb-10">
      <h2>
        顔画像を<br></br>撮影してください
      </h2>
      <div className="grid gap-4">
        <div id="msg" ref={msgRef}>
          {!showCanvas ? (
            <>
              <p>「カメラをONにする」ボタンを押して、</p>
              <p>カメラの使用を許可してください。</p>
            </>
          ) : (
            <></>
          )}
        </div>
        {!showCanvas && (
          <button className="type-a mb-10" onClick={drawImagesFromMediaDevice}>
            カメラをONにする
          </button>
        )}

        <canvas
          id="canvas"
          className="mx-auto w-full"
          ref={canvasRef}
          style={{
            visibility: showCanvas ? "visible" : "hidden",
            width: window.innerWidth * 0.9 * 0.9,
          }}
        ></canvas>
        <button
          className="w-[200px] p-4 text-white bg-app-brown mx-auto mt-10"
          style={{
            visibility: showCanvas ? "visible" : "hidden",
          }}
          onClick={() => {
            if (!shotDone) {
              detecting.current = false;
              setShotDone(true);
            } else {
              detecting.current = true;
              setShotDone(false);
              startTick();
            }
          }}
        >
          <FontAwesomeIcon
            className="text-4xl"
            icon={shotDone ? faRotateRight : faCamera}
          />
        </button>
        {shotDone && (
          <p>
            この写真でよろしければ、<br></br>次へ進んでください。
          </p>
        )}
      </div>
    </div>
  );
}
