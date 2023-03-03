import React, { useState } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import QREncoder from "../../components/QREncoder";

export default function SpotAuthQRReader(props: {
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
      <QREncoder onLoaded={handleLoadedData} />
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          入力に戻る
        </button>
        <button className="type-b" onClick={props.onHandleGoNext}>
          確認画面へ進む
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
