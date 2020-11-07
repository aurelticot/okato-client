import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import {
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@material-ui/icons";
import {
  Market,
  MarketStatus,
} from "../../../../../../../../../../../../lib/types";
import { useMarketStatus } from "../../../../../../../../../../../../lib/hooks";
import { FluidText } from "../../../../../../../../../../../../lib/components";
import { getFluidTextValues } from "../../../../../../../../../../../../lib/utils";

const mainFluidText = getFluidTextValues(1);
const iconFluidText = getFluidTextValues(0.7);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "baseline",
  },
  statusIcon: {
    fontSize: `clamp(${iconFluidText.minSize}, ${iconFluidText.sizeRatio}vmin, ${iconFluidText.maxSize})`,
    margin: `0 ${theme.spacing(0.5)}px`,
  },
}));

interface Props {
  market: Market;
  time: Date | null;
}

export const MarketTitle: React.FunctionComponent<Props> = (props) => {
  const { market, time } = props;
  const status = useMarketStatus(market, true, time);

  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <FluidText {...mainFluidText}>{market.name}</FluidText>
      {status === MarketStatus.OPEN ? (
        <FullCircle className={classes.statusIcon} />
      ) : (
        <HollowedCircle className={classes.statusIcon} />
      )}
    </Box>
  );
};
