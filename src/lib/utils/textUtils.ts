import { textDefault } from "../constants";

const { minREMSize, sizeVminRatio, maxREMSize } = textDefault;

export const getFluidTextValues = (minREMValue: number) => {
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
