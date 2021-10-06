import React from "react";
import { Box, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FluidText } from "components/atoms";
import { getFluidTextValues } from "lib/utils";

const fluidText = getFluidTextValues(1);

const useStyles = makeStyles(() => ({
  headerPlaceholder: {
    visibility: "hidden",
  },
}));

interface Props {
  intensity?: number;
}

const minIntensity = 0;
const maxIntensity = 1;
const maxAlpha = 0.12;

export const TimelineItemSkeleton: React.FunctionComponent<Props> = (props) => {
  const { intensity = maxIntensity } = props;
  const classes = useStyles();
  const animation = "pulse";
  const alpha =
    maxAlpha * Math.max(minIntensity, Math.min(intensity, maxIntensity));
  const skeletonColor = `rgba(255, 255, 255, ${alpha})`;
  return (
    <Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            px: 1,
            py: 0,
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Box
            sx={{
              flexBasis: "25%",
              maxWidth: "25%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Skeleton
              variant="text"
              animation={animation}
              sx={{ bgcolor: skeletonColor }}
            >
              <FluidText {...fluidText}>London</FluidText>
            </Skeleton>
          </Box>
          <Box
            sx={{
              flexBasis: "50%",
              maxWidth: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="text"
              animation={animation}
              sx={{ bgcolor: skeletonColor }}
            >
              <FluidText {...fluidText}>23:59</FluidText>
            </Skeleton>
          </Box>
          <Box
            sx={{
              flexBasis: "25%",
              maxWidth: "25%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Skeleton
              variant="text"
              animation={animation}
              sx={{ bgcolor: skeletonColor }}
            >
              <FluidText {...fluidText}>open in 24h</FluidText>
            </Skeleton>
          </Box>
        </Box>
        <FluidText {...fluidText} className={classes.headerPlaceholder}>
          {"\u00A0"}
        </FluidText>
      </Box>
      <Box
        sx={{
          height: `clamp(3rem, 8vmin, 8rem)`,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation={animation}
          sx={{ bgcolor: skeletonColor }}
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};
