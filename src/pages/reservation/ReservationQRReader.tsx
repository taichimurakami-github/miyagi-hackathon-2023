import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import QREncoder from "../../components/QREncoder";

export default function ReservationQRReader(props: {
  ownerId: string;
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
  onSetLoadedQRData: (value: string) => void;
}) {
  const handleLoadedData = (value: string) => {
    /**
     * ここにバリデーションとエラーハンドリングを書く
     */
    if (value) {
      props.onSetLoadedQRData(value);
    }

    props.onHandleGoNext();
  };

  return (
    <div className="grid gap-10">
      <QREncoder
        title={
          <h2 className="mb-10">
            サービスのQRコードを<br></br>読み取ってください
          </h2>
        }
        onLoaded={handleLoadedData}
      />
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          戻る
        </button>
        <button
          className="type-b"
          onClick={props.onHandleGoNext}
          disabled={!props.ownerId}
        >
          次へ
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
