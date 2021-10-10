import React from "react";
import { SnackbarProvider } from "notistack";

export const FeedbackProvider: React.FunctionComponent = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
};
