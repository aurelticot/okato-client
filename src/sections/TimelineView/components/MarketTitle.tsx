import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import {
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@material-ui/icons";
import { Market, MarketStatus } from "../../../lib/types";
import { useMarketStatus } from "../../../lib/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "baseline",
  },
  statusIcon: {
    fontSize: "0.7rem",
    margin: `0 ${theme.spacing(0.5)}px`,
  },
}));

interface Props {
  market: Market;
  time: Date | null;
}

export const MarketTitle = (props: Props) => {
  const { market, time } = props;
  const status = useMarketStatus(market, true, time);

  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <Typography component="h3">{market.name}</Typography>
      {status === MarketStatus.OPEN ? (
        <FullCircle className={classes.statusIcon} />
      ) : (
        <HollowedCircle className={classes.statusIcon} />
      )}
    </Box>
  );
};
