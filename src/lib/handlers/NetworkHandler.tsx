import React, { useCallback, useEffect, useRef } from "react";
import { useSnackbar, SnackbarKey } from "notistack";
import { useIntl } from "react-intl";
import { isOnline } from "lib/utils";

export const NetworkHandler: React.FunctionComponent = () => {
  const snackbarKey = useRef<SnackbarKey | undefined>();
  const i18n = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const offlineMessage = i18n.formatMessage({
    id: "NetworkHandler.notification.offlineMessage",
    description: "Message displayed in notification while offline",
    defaultMessage: "You are offline",
  });

  const onlineMessage = i18n.formatMessage({
    id: "NetworkHandler.notification.onlineMessage",
    description: "Message displayed in notification while back online",
    defaultMessage: "You are back online",
  });

  const handleOfflineEvent = useCallback(() => {
    snackbarKey.current = enqueueSnackbar(offlineMessage, {
      key: "offline",
      variant: "error",
      persist: true,
    });
  }, [enqueueSnackbar, offlineMessage]);

  const handleOnlineEvent = useCallback(() => {
    if (snackbarKey.current) {
      enqueueSnackbar(onlineMessage, {
        key: "online",
        variant: "default",
      });
      closeSnackbar(snackbarKey.current);
    }
  }, [enqueueSnackbar, closeSnackbar, onlineMessage]);

  useEffect(() => {
    window.addEventListener("offline", handleOfflineEvent);
    window.addEventListener("online", handleOnlineEvent);
    if (!isOnline()) {
      handleOfflineEvent();
    }
    return () => {
      window.removeEventListener("offline", handleOfflineEvent);
      window.removeEventListener("online", handleOnlineEvent);
    };
  }, [handleOfflineEvent, handleOnlineEvent]);

  return null;
};
