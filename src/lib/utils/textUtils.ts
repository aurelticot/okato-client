import { textDefault } from "../constants";
import { FluidTextValues } from "../types";

const { minREMSize, sizeVminRatio, maxREMSize } = textDefault;

export const getFluidTextValues = (minREMValue: number): FluidTextValues => {
  const maxREMValue = (minREMValue * maxREMSize) / minREMSize;
  const ratio =
    maxREMSize === minREMSize
      ? 0
      : (sizeVminRatio * (maxREMValue - minREMValue)) /
        (maxREMSize - minREMSize);
  return {
    sizeRatio: ratio,
    minSize: `${minREMValue}rem`,
    maxSize: `${maxREMValue}rem`,
  };
};

export const getFluidCSSLength = (minREMValue: number): string => {
  const { minSize, sizeRatio, maxSize } = getFluidTextValues(minREMValue);
  return `clamp(${minSize}, ${sizeRatio}vmin, ${maxSize})`;
};
