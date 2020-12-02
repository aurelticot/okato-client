import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(1),
  },
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
  const fullscreen = useMediaQuery(theme.breakpoints.down("xs"));

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
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
