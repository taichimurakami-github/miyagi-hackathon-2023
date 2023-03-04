import React, { PropsWithChildren } from "react";

export default function AppMainContainer(props: PropsWithChildren) {
  return <div className="w-[85%] mx-auto py-10">{props.children}</div>;
}
