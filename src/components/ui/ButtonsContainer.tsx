import React, { PropsWithChildren } from "react";

export const TwinButtonsContainer = (props: PropsWithChildren) => (
  <div className="flex justify-between p-2">{props.children}</div>
);
