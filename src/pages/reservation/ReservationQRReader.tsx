import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";

export default function ReservationQRReader(props: {
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
}) {
  return (
    <div>
      ReservationQRReader
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>戻る</button>
        <button onClick={props.onHandleGoNext}>次へ</button>
      </TwinButtonsContainer>
    </div>
  );
}
