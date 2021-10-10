import React from "react";
import { NetworkHandler } from "./NetworkHandler";

export const AppHandlers: React.FunctionComponent = (props) => {
  return (
    <>
      <NetworkHandler />
      {props.children}
    </>
  );
};
