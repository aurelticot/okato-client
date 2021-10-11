import React from "react";
import { NetworkHandler } from "./NetworkHandler";
import { ServiceWorkerHandler } from "./ServiceWorkerHandler";

export const AppHandlers: React.FunctionComponent = (props) => {
  return (
    <>
      <NetworkHandler />
      <ServiceWorkerHandler />
      {props.children}
    </>
  );
};
