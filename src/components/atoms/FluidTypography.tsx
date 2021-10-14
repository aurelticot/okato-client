import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface Props {
  sizeRatio: number;
  ratioUnit?: "vw" | "vh" | "vmin" | "vmax";
  minSize?: string;
  maxSize?: string;
}

const cleanProps = (
  props: Partial<Props> & TypographyProps
): TypographyProps => {
  const cleanedProps = { ...props };
  delete cleanedProps.sizeRatio;
  delete cleanedProps.ratioUnit;
  delete cleanedProps.minSize;
  delete cleanedProps.maxSize;
  return cleanedProps;
};

export const FluidTypography: React.FunctionComponent<Props & TypographyProps> =
  (props) => {
    const { minSize = "1rem", sizeRatio, ratioUnit = "vmin", maxSize } = props;
    const cleanedProps = cleanProps(props);
    return (
      <Typography
        {...cleanedProps}
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
