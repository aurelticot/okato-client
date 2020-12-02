import React from "react";
import { useIntl } from "react-intl";
import { Button } from "@material-ui/core";
import { AppDialog } from "../components";
import { SettingsList } from "./components";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FunctionComponent<Props> = ({
  open = false,
  onClose,
}) => {
  const i18n = useIntl();

  const modalCloseButtonLabel = i18n.formatMessage({
    id: "App.modalDialog.closeButtonLabel",
    description: "Label of the the 'Close' button in the main dialog",
    defaultMessage: "Close",
  });

  const settingsModalTitle = i18n.formatMessage({
    id: "App.modalDialog.settingsTitle",
    description: "Title of the Settings dialog",
    defaultMessage: "Settings",
  });

  return (
    <AppDialog
      title={settingsModalTitle}
      open={open}
      onClose={onClose}
      actions={<Button onClick={onClose}>{modalCloseButtonLabel}</Button>}
    >
      <SettingsList />
    </AppDialog>
  );
};
