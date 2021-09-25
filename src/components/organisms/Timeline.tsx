import React from "react";
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TimelineSegment as TimelineSegmentType } from "lib/types";
import { getTimelineSizeInMinutes } from "lib/utils";
import { TimelineSegment, TimelineSegmentDefault } from "components/atoms";

const timelineSize = getTimelineSizeInMinutes();

const useStyles = makeStyles((theme) => ({
  root: {
    height: `clamp(3rem, 8vmin, 8rem)`,
  },
  timelineWrapper: {
    position: "relative",
    height: "100%",
  },
  timeMarker: {
    width: "2px",
    opacity: "100%",
    backgroundColor: theme.palette.grey[400],
    boxShadow: theme.shadows[3],
  },
  baseTimeMarker: {
    position: "absolute",
    left: "calc(50% - 1px)",
    zIndex: 10,
    height: `clamp(3rem, 8vmin, 8rem)`,
  },
  nowTimeMarker: {
    position: "absolute",
    left: "calc(50% - 1px)",
    zIndex: 10,
    backgroundColor: theme.palette.primary.main,
  },
  timeline: {
    display: "flex",
    height: "100%",
    boxShadow: theme.shadows[3],
  },
}));

interface Props {
  segments: TimelineSegmentType[];
  hideNowTimeMarker?: boolean;
  hideBaseTimeMarker?: boolean;
}

export const Timeline: React.FunctionComponent<Props> = (props) => {
  const {
    segments,
    hideNowTimeMarker = false,
    hideBaseTimeMarker = false,
  } = props;
  const timelineSegments = segments.map((segment) => {
    return (
      <TimelineSegment
        key={segment.startDate.toMillis()}
        segment={segment}
        timelineSize={timelineSize}
      />
    );
  });

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {!hideBaseTimeMarker && (
        <Divider
          orientation="vertical"
          className={`${classes.timeMarker} ${classes.baseTimeMarker}`}
        />
      )}
      <Box className={classes.timelineWrapper}>
        {!hideNowTimeMarker && (
          <Divider
            orientation="vertical"
            className={`${classes.timeMarker} ${classes.nowTimeMarker}`}
          />
        )}
        <Box className={classes.timeline}>
          {timelineSegments.length > 0 ? (
            timelineSegments
          ) : (
            <TimelineSegmentDefault />
          )}
        </Box>
      </Box>
    </Box>
  );
};
