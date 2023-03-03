import { PropsWithChildren } from "react";

export const DataShowcaseContainer = (props: PropsWithChildren) => (
  <div className="w-[95%] mx-auto shadow-lg rounded-md p-2 grid gap-4 form-table-container">
    {props.children}
  </div>
);
