import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import Selphy from "../../components/Selphy";

export default function SpotAuthSelphy(props: {
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
}) {
  return (
    <div className="grid gap-10">
      <Selphy onLoaded={() => {}} />
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          戻る
        </button>
        <button className="type-b" onClick={props.onHandleGoNext}>
          確認に進む
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
