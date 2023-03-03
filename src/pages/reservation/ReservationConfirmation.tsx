import React from "react";
import { useNavigate } from "react-router";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";

export default function ReservationConfirmation(props: {
  onHandleGoBack: () => void;
  onHandleGoToTop: () => void;
}) {
  return (
    <div>
      ReservationConfirmation
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>入力に戻る</button>
        <button onClick={props.onHandleGoToTop}>トップに戻る</button>
      </TwinButtonsContainer>
    </div>
  );
}
