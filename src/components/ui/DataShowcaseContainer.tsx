import { PropsWithChildren } from "react";

export const DataShowcaseContainer = (
  props: PropsWithChildren<{
    title: string;
  }>
) => (
  <div className="w-[95%] mx-auto shadow-lg rounded-md form-table-container overflow-hidden">
    <h4 className="bg-app-brown text-white">{props.title}</h4>
    <div className=" grid gap-4 p-2"> {props.children}</div>
  </div>
);
