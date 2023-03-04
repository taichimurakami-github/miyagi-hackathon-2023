import React from "react";
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

  const onHandleSubmit = async (d: { [key: string]: string }) => {
    console.log(d);
    if (watch().pincode.length > 3) {
      props.onHandleGoNext();
    }
  };

  return (
    <form className="grid gap-10" onSubmit={handleSubmit(onHandleSubmit)}>
      <label className="grid gap-10">
        マイナンバーカードの暗証番号（4桁）を<br></br>入力してください
        <input
          className="w-[250px] text-3xl bg-app-brown rounded-md p-2 mx-auto text-white text-center"
          {...register("pincode", {
            required: true,
            minLength: 4,
            maxLength: 4,
          })}
          placeholder="半角英数字4桁"
          type="number"
        />
      </label>

      {errors.pincode && (
        <span className="text-red-600 font-bold text-lg">
          マイナンバーカードの暗証番号を<br></br>4桁で入力してください
        </span>
      )}
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          戻る
        </button>
        <button
          type="submit"
          className="type-b"
          // onClick={onHandleSubmit}
          // disabled={inputText.length !== 4}
        >
          認証を行う
        </button>
      </TwinButtonsContainer>
    </form>
  );
}
