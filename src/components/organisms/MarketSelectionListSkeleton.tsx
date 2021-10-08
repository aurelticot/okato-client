import React from "react";
import { MarketSelectionItemSkeleton } from "components/molecules";

interface Props {
  nbItems?: number;
  maxItems?: number;
}

export const MarketSelectionListSkeleton: React.FunctionComponent<Props> = (
  props
) => {
  const { nbItems = 5, maxItems = 5 } = props;
  const nbSkeletons = nbItems ? Math.min(nbItems, maxItems) : maxItems;
  return (
    <>
      {[...Array(nbSkeletons).keys()].reverse().map((index) => (
        <MarketSelectionItemSkeleton
          key={`skeleton_${index}`}
          intensity={(index + 1) / nbSkeletons}
        />
      ))}
    </>
  );
};
