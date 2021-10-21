import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Box, Button, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const primaryMessageDefinition = {
  id: "DefaultErrorFallback.primaryMessage",
  defaultMessage: "Oops, something went wrong!",
  description:
    "Error message on the default fallback displayed when something went wrong",
};

const secondaryMessageDefinition = {
  id: "DefaultErrorFallback.secondaryMessage",
  defaultMessage:
    "If the error persists, try refreshing your browser and cleaning your browser's data.",
  description:
    "Message fn the default fallback inviting users to refresh their browser displayed when something went wrong",
};

const retryButtonLabelDefinition = {
  id: "DefaultErrorFallback.retryButtonLabel",
  defaultMessage: "Try again",
  description:
    "Label of the 'Try Again' button displayed on the default fallback when something went wrong",
};

interface Props {
  primaryMessage?: string;
  secondaryMessage?: string;
  retryButtonLabel?: string;
}

export const RawDefaultErrorFallback: React.FunctionComponent<
  Props & FallbackProps
> = ({
  resetErrorBoundary,
  primaryMessage = primaryMessageDefinition.defaultMessage,
  secondaryMessage = secondaryMessageDefinition.defaultMessage,
  retryButtonLabel = retryButtonLabelDefinition.defaultMessage,
}) => {
  return (
    <Box
      role="alert"
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: (theme) => theme.spacing(2),
      }}
    >
      <Typography component="p" variant="h5">
        {primaryMessage}
      </Typography>
      <Button onClick={resetErrorBoundary}>{retryButtonLabel}</Button>
      <Typography variant="body2">{secondaryMessage}</Typography>
    </Box>
  );
};

export const DefaultErrorFallback: React.FunctionComponent<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const i18n = useIntl();

  const primaryMessage = i18n.formatMessage(primaryMessageDefinition);
  const secondaryMessage = i18n.formatMessage(secondaryMessageDefinition);
  const retryButtonLabel = i18n.formatMessage(retryButtonLabelDefinition);

  return (
    <RawDefaultErrorFallback
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      primaryMessage={primaryMessage}
      secondaryMessage={secondaryMessage}
      retryButtonLabel={retryButtonLabel}
    />
  );
};
