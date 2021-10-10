import React from "react";
import { TimelineItemSkeleton } from "components/molecules";

interface Props {
  nbItems?: number;
  maxItems?: number;
}

export const TimelinesListSkeleton: React.FunctionComponent<Props> = (
  props
) => {
  const { nbItems = 5, maxItems = 5 } = props;
  const nbSkeletons = nbItems ? Math.min(nbItems, maxItems) : maxItems;
  return (
    <>
      {[...Array(nbSkeletons).keys()].reverse().map((index) => (
        <TimelineItemSkeleton
          key={`skeleton_${index}`}
          intensity={(index + 1) / nbSkeletons}
        />
      ))}
    </>
  );
};
