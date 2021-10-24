import React, { useCallback } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";
import { sendTelemetryError } from "lib/utils";
import {
  DefaultErrorFallback,
  RawDefaultErrorFallback,
} from "components/atoms";

export { useErrorHandler } from "react-error-boundary";

interface Props {
  raw?: boolean;
  noTelemetryReport?: boolean;
}

export const ErrorHandler: React.FunctionComponent<
  Props & Partial<Omit<ErrorBoundaryProps, "fallback FallbackComponent">>
> = (props) => {
  const {
    raw = false,
    noTelemetryReport = false,
    fallbackRender,
    onError,
    onReset,
    onResetKeysChange,
    resetKeys,
  } = props;

  const handleError = useCallback(
    (error: Error, info: { componentStack: string }) => {
      if (!noTelemetryReport) {
        sendTelemetryError(error);
        // eslint-disable-next-line no-console
        console.error(
          "An error occured and has been reported by the telemetry:",
          error.message
        );
      }
      onError && onError(error, info);
    },
    [noTelemetryReport, onError]
  );

  return (
    <ErrorBoundary
      fallbackRender={
        fallbackRender
          ? fallbackRender
          : ({ error, resetErrorBoundary }) =>
              raw ? (
                <RawDefaultErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              ) : (
                <DefaultErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )
      }
      onError={handleError}
      onReset={onReset}
      onResetKeysChange={onResetKeysChange}
      resetKeys={resetKeys}
    >
      {props.children}
    </ErrorBoundary>
  );
};
