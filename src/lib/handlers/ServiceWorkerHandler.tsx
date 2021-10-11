import React, { useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";

export const ServiceWorkerHandler: React.FunctionComponent = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const i18n = useIntl();

  const updateAvailableMessage = i18n.formatMessage({
    id: "ServiceWorkerHandler.notification.updateAvailableMessage",
    description:
      "Message displayed in notification when a new update is available",
    defaultMessage: "New update available",
  });

  const refreshButtonLabel = i18n.formatMessage({
    id: "ServiceWorkerHandler.notification.refreshButtonLabel",
    description: "Label of the 'Refresh' button in the notification",
    defaultMessage: "Refresh",
  });

  const refresh = useCallback((waitingWorker: ServiceWorker) => {
    waitingWorker.addEventListener("statechange", () => {
      if (waitingWorker.state === "activated") {
        window.location.reload();
      }
    });
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }, []);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration: ServiceWorkerRegistration) => {
        const waitingWorker = registration.waiting;
        if (!waitingWorker) {
          return;
        }
        enqueueSnackbar(updateAvailableMessage, {
          key: "new-update-available",
          variant: "default",
          persist: true,
          action: (key) => (
            <>
              <Button onClick={() => refresh(waitingWorker)}>
                {refreshButtonLabel}
              </Button>
              <IconButton
                onClick={() => {
                  closeSnackbar(key);
                }}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </>
          ),
        });
      },
    });
  }, [
    enqueueSnackbar,
    closeSnackbar,
    refresh,
    updateAvailableMessage,
    refreshButtonLabel,
  ]);

  return null;
};
