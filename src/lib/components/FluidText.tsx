import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
      className={`${classes.fluidText} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </Typography>
  );
};
