import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ruler: {
    display: "flex",
    justifyContent: "space-between",
  },
  segment: {
    height: "1em",
    width: "3px",
  },
}));

export const TimelineRuler = () => {
  const classes = useStyles();
  return (
    <Box className={classes.ruler}>
      {[1, 2, 3, 4, 5, 6].map((value) => {
        return (
          <Divider
            orientation="vertical"
            className={classes.segment}
            key={value}
          />
        );
      })}
    </Box>
  );
};
