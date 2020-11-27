import React from "react";
import { useIntl } from "react-intl";
import { Button } from "@material-ui/core";
import { AppDialog } from "../components";
import { MarketSelectionList } from "./components";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MarketSelectionDialog: React.FunctionComponent<Props> = ({
  open = false,
  onClose,
}) => {
  const i18n = useIntl();

  const modalCloseButtonLabel = i18n.formatMessage({
    id: "App.modalDialog.closeButtonLabel",
    description: "Label of the the 'Close' button in the main dialog",
    defaultMessage: "Close",
  });

  const marketSelectionModalTitle = i18n.formatMessage({
    id: "App.modalDialog.marketSelectionTitle",
    description: "Title of the Market Selection dialog",
    defaultMessage: "Market Selection",
  });

  return (
    <AppDialog
      title={marketSelectionModalTitle}
      open={open}
      onClose={onClose}
      actions={<Button onClick={onClose}>{modalCloseButtonLabel}</Button>}
    >
      <MarketSelectionList />
    </AppDialog>
  );
};
