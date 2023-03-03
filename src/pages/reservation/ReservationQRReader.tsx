import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import QREncoder from "../../components/QREncoder";

export default function ReservationQRReader(props: {
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
    <div>
      ReservationQRReader
      <QREncoder onLoaded={handleLoadedData} />
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>戻る</button>
        <button onClick={props.onHandleGoNext}>次へ</button>
      </TwinButtonsContainer>
    </div>
  );
}
