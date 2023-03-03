import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";

export default function SpotAuthQRReader(props: {
  onHandleGoBack: () => void;
  onHandleGoNext: () => void;
}) {
  return (
    <div>
      SpotAuthQRReader{" "}
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>入力に戻る</button>
        <button onClick={props.onHandleGoNext}>確認画面へ進む</button>
      </TwinButtonsContainer>
    </div>
  );
}
