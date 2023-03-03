import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { useForm } from "react-hook-form";

export default function SpotAuthSignUp(props: {
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = async () => {
    props.onHandleGoNext();
  };

  return (
    <div className="grid gap-10">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <label className="grid gap-4">
          マイナンバーカードの暗証番号（4桁）を入力してください
          <input
            {...register("exampleRequired", { required: true })}
            placeholder="マイナンバーカードの暗証番号（4桁）を入力してください"
          />
        </label>

        {errors.exampleRequired && (
          <span className="text-red-600 font-bold text-xl">
            PINを入力してください
          </span>
        )}
      </form>
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>戻る</button>
        <button onClick={props.onHandleGoNext}>認証を行う</button>
      </TwinButtonsContainer>
    </div>
  );
}
