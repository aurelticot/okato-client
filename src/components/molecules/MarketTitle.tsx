import React from "react";
import { Box } from "@mui/material";
import {
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@mui/icons-material";
import { MarketStatus } from "lib/types";
import { FluidText } from "components/atoms";
import { getFluidTextValues } from "lib/utils";

const mainFluidText = getFluidTextValues(1);

interface Props {
  name: string;
  status: MarketStatus;
}

export const MarketTitle: React.FunctionComponent<Props> = (props) => {
  const { name, status } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-start",
        whiteSpace: "nowrap",
      }}
    >
      {status === MarketStatus.OPEN ? (
        <FullCircle
          sx={{
            fontSize: (theme) => theme.custom.mixins.fluidLength(0.7),
            mr: 0.5,
          }}
        />
      ) : (
        <HollowedCircle
          sx={{
            fontSize: (theme) => theme.custom.mixins.fluidLength(0.7),
            mr: 0.5,
          }}
        />
      )}
      <FluidText {...mainFluidText}>{name}</FluidText>
    </Box>
  );
};
