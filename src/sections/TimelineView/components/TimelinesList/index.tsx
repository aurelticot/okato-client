import React from "react";
import { Market } from "../../../../lib/types";
import { TimelineItem } from "../TimelineItem";
import { TimelineRuler } from "../TimelineRuler";

interface Props {
  baseTime: Date | null;
  markets: Market[];
}

export const TimelinesList: React.FunctionComponent<Props> = ({
  baseTime,
  markets,
}) => {
  return (
    <>
      <TimelineRuler />
      {markets.map((market) => {
        return (
          <TimelineItem
            key={market.id}
            time={baseTime}
            market={{ ...market, hasReminder: false, isBookmarked: false }}
          />
        );
      })}
    </>
  );
};
