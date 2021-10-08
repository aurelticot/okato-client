import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface Props {
  sizeRatio: number;
  ratioUnit?: "vw" | "vh" | "vmin" | "vmax";
  minSize?: string;
  maxSize?: string;
}

export const FluidTypography: React.FunctionComponent<Props & TypographyProps> =
  (props) => {
    const { minSize = "1rem", sizeRatio, ratioUnit = "vmin", maxSize } = props;
    return (
      <Typography
        {...props}
        sx={{
          ...props.sx,
          fontSize: `clamp(${minSize}, ${sizeRatio}${ratioUnit}, ${
            maxSize ? maxSize : sizeRatio
          })`,
        }}
      >
        {props.children}
      </Typography>
    );
  };
