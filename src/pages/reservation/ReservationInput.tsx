import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";

export default function ReservationInput(props: {
  ownerId: string;
  onHandleGoBack: () => void;
  onHandleGoNext: () => void;
}) {
  return (
    <div>
      ReservationInput
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>入力に戻る</button>
        <button onClick={props.onHandleGoNext}>確認画面へ進む</button>
      </TwinButtonsContainer>
    </div>
  );
}
