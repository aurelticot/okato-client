import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import {
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@material-ui/icons";
import { MarketStatus } from "lib/types";
import { FluidText } from "lib/components";
import { getFluidTextValues } from "lib/utils";

const mainFluidText = getFluidTextValues(1);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
  },
  statusIcon: {
    fontSize: theme.custom.mixins.fluidLength(0.7),
    marginRight: theme.spacing(0.5),
  },
}));

interface Props {
  name: string;
  status: MarketStatus;
}

export const MarketTitle: React.FunctionComponent<Props> = (props) => {
  const { name, status } = props;

  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      {status === MarketStatus.OPEN ? (
        <FullCircle className={classes.statusIcon} />
      ) : (
        <HollowedCircle className={classes.statusIcon} />
      )}
      <FluidText {...mainFluidText}>{name}</FluidText>
    </Box>
  );
};
