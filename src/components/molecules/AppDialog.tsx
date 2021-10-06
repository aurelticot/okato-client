import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    backgroundColor: theme.palette.background.default,
  },
}));

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

  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      fullScreen={fullscreen}
      classes={
        fullscreen
          ? {
              paper: classes.dialogContainer,
            }
          : {}
      }
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
