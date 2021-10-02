import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

interface Props {
  sizeRatio: number;
  ratioUnit?: "vw" | "vh" | "vmin" | "vmax";
  minSize?: string;
  maxSize?: string;
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = makeStyles(() => ({
  fluidText: {
    fontSize: ({
      minSize = "1rem",
      sizeRatio,
      ratioUnit = "vmin",
      maxSize,
    }: Props) =>
      `clamp(${minSize}, ${sizeRatio}${ratioUnit}, ${
        maxSize ? maxSize : sizeRatio
      })`,
  },
}));

export const FluidText: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <Typography
      className={`${classes.fluidText} ${
        props.className ? props.className : ""
      }`}
      style={props.style}
    >
      {props.children}
    </Typography>
  );
};
