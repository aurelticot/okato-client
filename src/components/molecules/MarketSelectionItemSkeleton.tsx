import React from "react";
import {
  ListItemText,
  ListItem,
  Skeleton,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";

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
  const theme = useTheme();
  const alphaValue =
    maxAlpha * Math.max(minIntensity, Math.min(intensity, maxIntensity));
  const skeletonColor = alpha(theme.palette.text.primary, alphaValue);
  const animation = "pulse";
  return (
    <ListItem>
      <ListItemText
        primary={
          <Skeleton
            variant="text"
            animation={animation}
            sx={{ backgroundColor: skeletonColor }}
          >
            <Typography>LSE - London Stock Exchange</Typography>
          </Skeleton>
        }
        secondary={
          <Skeleton
            variant="text"
            animation={animation}
            sx={{ backgroundColor: skeletonColor }}
          >
            <Typography>London</Typography>
          </Skeleton>
        }
      />
    </ListItem>
  );
};
