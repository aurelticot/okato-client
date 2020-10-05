import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useIntl } from "react-intl";
import { SettingValue } from "../types";

interface Props {
  title: string;
  open: boolean;
  values: SettingValue[];
  selectedValue: string | string[];
  onClose: (value: string | string[]) => void;
}

export const SettingSelectionDialog = (props: Props) => {
  const { open, selectedValue, onClose, title, values } = props;
  const i18n = useIntl();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <List>
        {values.map((value) => (
          <ListItem
            button
            onClick={() => handleListItemClick(value.key)}
            key={value.key}
          >
            <ListItemText
              primary={i18n.formatMessage({ id: value.localizedLabelKey })}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
