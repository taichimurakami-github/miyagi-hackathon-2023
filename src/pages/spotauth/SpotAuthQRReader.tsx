import React, { useState } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import QREncoder from "../../components/QREncoder";

export default function SpotAuthQRReader(props: {
  ownerId: string;
  onSetLoadedData: (value: string) => void;
  onHandleGoBack: () => void;
  onHandleGoNext: () => void;
}) {
  const handleLoadedData = (value: string) => {
    console.log(value);
    /**
     * ここでエラーハンドリング
     */
    if (value) {
      props.onSetLoadedData(value);
    }

    props.onHandleGoNext();
  };

  return (
    <div>
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
          入力に戻る
        </button>
        <button
          className="type-b"
          onClick={props.onHandleGoNext}
          disabled={!props.ownerId}
        >
          写真撮影へ進む
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
