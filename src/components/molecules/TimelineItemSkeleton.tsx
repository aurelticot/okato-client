import React from "react";
import { Box, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FluidText } from "components/atoms";
import { getFluidTextValues } from "lib/utils";

const fluidText = getFluidTextValues(1);

const useStyles = makeStyles((theme) => ({
  timelineSkeletonWrapper: {
    height: `clamp(3rem, 8vmin, 8rem)`,
  },
  headerPlaceholder: {
    visibility: "hidden",
  },
  headerContainer: {
    width: "100%",
    padding: `0 ${theme.spacing(1)}`,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  titleSkeletonWrapper: {
    flexBasis: "25%",
    maxWidth: "25%",
    display: "flex",
    justifyContent: "flex-start",
  },
  clockSkeletonWrapper: {
    flexBasis: "50%",
    maxWidth: "50%",
    display: "flex",
    justifyContent: "center",
  },
  nextEventSkeletonWrapper: {
    flexBasis: "25%",
    maxWidth: "25%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const TimelineItemSkeleton: React.FunctionComponent = () => {
  const classes = useStyles();
  const animation = "pulse";
  return (
    <>
      <Box>
        <Box className={classes.headerContainer}>
          <Box className={classes.titleSkeletonWrapper}>
            <Skeleton variant="text" animation={animation}>
              <FluidText {...fluidText}>London</FluidText>
            </Skeleton>
          </Box>
          <Box className={classes.clockSkeletonWrapper}>
            <Skeleton variant="text" animation={animation}>
              <FluidText {...fluidText}>23:59</FluidText>
            </Skeleton>
          </Box>
          <Box className={classes.nextEventSkeletonWrapper}>
            <Skeleton variant="text" animation={animation}>
              <FluidText {...fluidText}>open in 24h</FluidText>
            </Skeleton>
          </Box>
        </Box>
        <FluidText {...fluidText} className={classes.headerPlaceholder}>
          {"\u00A0"}
        </FluidText>
      </Box>
      <Box className={classes.timelineSkeletonWrapper}>
        <Skeleton
          variant="rectangular"
          animation={animation}
          width="100%"
          height="100%"
        />
      </Box>
    </>
  );
};
