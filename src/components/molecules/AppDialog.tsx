import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  actions: React.ReactNode;
}

export const AppDialog: React.FunctionComponent<Props> = ({
  title,
  open = false,
  onClose,
  actions,
  children,
}) => {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      fullScreen={fullscreen}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
