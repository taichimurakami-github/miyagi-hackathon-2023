import React from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { useForm } from "react-hook-form";

export default function ReservationInput(props: {
  ownerId: string;
  onSetFormData: (data: { [d: string]: string }) => void;
  onHandleGoBack: () => void;
  onHandleGoNext: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (d: { [key: string]: string }) => {
    console.log(d);

    /**
     * ここにバリデーション処理
     */

    props.onSetFormData(d);
    props.onHandleGoNext();
  };

  return (
    <div className="grid gap-4">
      {/* <h2 className="mb-10">{props.ownerId} の 予約フォームです</h2> */}
      <h2 className="mb-10">
        青翠のまじんこ のご利用に必要な情報を入力してください
      </h2>
      <form className="grid gap-10" onSubmit={handleSubmit(onHandleSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <label className="grid gap-2">
          宿泊プランを選んでください
          <select {...register("grade")}>
            <option value="梅">梅</option>
            <option value="竹">竹</option>
            <option value="松">松</option>
          </select>
        </label>

        <label className="grid gap-2">
          宿泊日数を選んでください
          <select {...register("date")}>
            <option value="1">1泊</option>
            <option value="2">2泊</option>
            <option value="3">3泊</option>
            <option value="4">4泊</option>
            <option value="5">5泊</option>
          </select>
        </label>

        <label className="grid gap-2">
          宿泊人数を選んでください
          <select {...register("number")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && (
          <span className="text-red-600 font-bold text-xl">
            全ての項目を選択してください
          </span>
        )} */}

        <TwinButtonsContainer>
          <button className="type-b-reverse" onClick={props.onHandleGoBack}>
            戻る
          </button>
          <button className="type-b" type="submit">
            確認画面へ
          </button>
        </TwinButtonsContainer>
      </form>
    </div>
  );
}
