import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Notifications as NotificationsIcon,
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@material-ui/icons";
import { Market, MarketStatus } from "../lib/types";
import { useFeature, useMarketStatus } from "../lib/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  statusIcon: {
    fontSize: "0.7em",
    margin: "0 0.5em",
  },
  bookmarkIcon: {
    fontSize: "1em",
    color: theme.palette.text.secondary,
  },
  reminderIcon: {
    fontSize: "0.7em",
    color: theme.palette.text.secondary,
  },
}));

interface Props {
  market: Market;
  time: Date | null;
}

export const MarketTitle = (props: Props) => {
  const bookmark = useFeature("bookmark");
  const reminder = useFeature("reminder");
  const classes = useStyles(props);

  const { market, time } = props;
  const status = useMarketStatus(market, true, time);
  const [bookmarked, setBookmarked] = useState(market.isBookmarked);

  return (
    <Box className={classes.root}>
      {bookmark.isEnabled() && (
        <IconButton size="small" onClick={() => setBookmarked(!bookmarked)}>
          {bookmarked ? (
            <BookmarkIcon className={classes.bookmarkIcon} />
          ) : (
            <BookmarkBorderIcon className={classes.bookmarkIcon} />
          )}
        </IconButton>
      )}
      <Box>{market.name}</Box>
      {status === MarketStatus.Opened ? (
        <FullCircle className={classes.statusIcon} />
      ) : (
        <HollowedCircle className={classes.statusIcon} />
      )}
      {reminder.isEnabled() && market.hasReminder && (
        <NotificationsIcon className={classes.reminderIcon} />
      )}
    </Box>
  );
};
