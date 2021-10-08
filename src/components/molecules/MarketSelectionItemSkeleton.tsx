import React from "react";
import { ListItemText, ListItem, Skeleton, Typography } from "@mui/material";

interface Props {
  intensity?: number;
}

const minIntensity = 0;
const maxIntensity = 1;
const maxAlpha = 0.12;

export const MarketSelectionItemSkeleton: React.FunctionComponent<Props> = (
  props
) => {
  const { intensity = maxIntensity } = props;
  const alpha =
    maxAlpha * Math.max(minIntensity, Math.min(intensity, maxIntensity));
  const skeletonColor = `rgba(255, 255, 255, ${alpha})`;
  const animation = "pulse";
  return (
    <ListItem>
      <ListItemText
        primary={
          <Skeleton
            variant="text"
            animation={animation}
            sx={{ bgcolor: skeletonColor }}
          >
            <Typography>LSE - London Stock Exchange</Typography>
          </Skeleton>
        }
        secondary={
          <Skeleton
            variant="text"
            animation={animation}
            sx={{ bgcolor: skeletonColor }}
          >
            <Typography>London</Typography>
          </Skeleton>
        }
      />
    </ListItem>
  );
};
