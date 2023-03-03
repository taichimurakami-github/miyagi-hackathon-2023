import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";

export default function SpotAuthConfirmation(props: {
  onHandleGoBack: () => void;
  onHandleGoToTop: () => void;
}) {
  return (
    <div>
      SpotAuthConfirmation{" "}
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>入力に戻る</button>
        <button onClick={props.onHandleGoToTop}>トップに戻る</button>
      </TwinButtonsContainer>
    </div>
  );
}
