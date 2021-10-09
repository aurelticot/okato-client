import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Button } from "@mui/material";
import { SettingKey, MarketSortingMethod } from "lib/types";
import { useUserSetting } from "lib/hooks";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";
import { AppDialog } from "components/molecules";
import { MarketSelectionList } from "components/organisms";

const PAGE_LIMIT = 20;

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MarketSelectionDialog: React.FunctionComponent<Props> = ({
  open = false,
  onClose,
}) => {
  const [marketSelection, setMarketSelection] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const [selection, setSelection] = useState<string[]>(marketSelection);
  const { data } = useQuery<MarketsData, MarketsVariables>(MARKETS, {
    variables: {
      sort: MarketSortingMethod.ALPHABETICALLY,
      page: 1,
      limit: PAGE_LIMIT,
      startDate: "",
      endDate: "",
      withSessions: false,
      withTimeline: false,
    },
  });

  const markets = data ? data.markets.result : null;

  const handleSelection = (marketId: string) => {
    const currentIndex = selection.indexOf(marketId);
    const newSelection = [...selection];
    if (currentIndex === -1) {
      newSelection.push(marketId);
    } else {
      newSelection.splice(currentIndex, 1);
    }
    setSelection(newSelection);
  };

  const handleCancel = () => {
    setSelection(marketSelection);
    onClose();
  };

  const handleApplySelection = () => {
    setMarketSelection(selection);
    onClose();
  };

  const i18n = useIntl();
  const modalCancelButtonLabel = i18n.formatMessage({
    id: "App.modalDialog.cancelButtonLabel",
    description: "Label of the the 'Cancel' button in the main dialog",
    defaultMessage: "Cancel",
  });
  const modalSaveButtonLabel = i18n.formatMessage({
    id: "App.modalDialog.saveButtonLabel",
    description: "Label of the the 'Save' button in the main dialog",
    defaultMessage: "Save",
  });
  const marketSelectionModalTitle = i18n.formatMessage({
    id: "App.modalDialog.marketSelectionTitle",
    description: "Title of the Market Selection dialog",
    defaultMessage: "Select Markets",
  });

  return (
    <AppDialog
      title={marketSelectionModalTitle}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={handleCancel}>{modalCancelButtonLabel}</Button>
          <Button onClick={handleApplySelection}>{modalSaveButtonLabel}</Button>
        </>
      }
    >
      <MarketSelectionList
        markets={markets}
        selection={selection}
        onSelection={handleSelection}
      />
    </AppDialog>
  );
};
