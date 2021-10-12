import React from "react";
import { Box, Divider } from "@mui/material";
import { TimelineSegment as TimelineSegmentType } from "lib/types";
import { getTimelineSizeInMinutes } from "lib/utils";
import { TimelineSegment, TimelineSegmentDefault } from "components/atoms";

const timelineSize = getTimelineSizeInMinutes();

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

  return (
    <Box
      sx={{
        height: `clamp(3rem, 8vmin, 8rem)`,
      }}
    >
      {!hideBaseTimeMarker && (
        <Divider
          orientation="vertical"
          sx={{
            height: `clamp(3rem, 8vmin, 8rem)`,
            width: "2px",
            opacity: "100%",
            backgroundColor: "secondary.light",
            boxShadow: 3,
            position: "absolute",
            left: "calc(50% - 1px)",
            zIndex: 10,
          }}
        />
      )}
      <Box
        sx={{
          position: "relative",
          height: "100%",
        }}
      >
        {!hideNowTimeMarker && (
          <Divider
            orientation="vertical"
            sx={{
              width: "2px",
              opacity: "100%",
              backgroundColor: "primary.main",
              boxShadow: 3,
              position: "absolute",
              left: "calc(50% - 1px)",
              zIndex: 10,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            height: "100%",
            boxShadow: 3,
          }}
        >
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
