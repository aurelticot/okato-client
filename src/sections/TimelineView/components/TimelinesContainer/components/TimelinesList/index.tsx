import React from "react";
import { Box, CircularProgress, Link, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ClearAll as TimelinesIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { Market } from "lib/types";
import { TimelineItem, TimelineRuler } from "./components";
import { FluidText } from "lib/components";
import { getFluidTextValues } from "lib/utils";
import { routes } from "lib/constants";

const mainFluidText = getFluidTextValues(1.1);

const useStyles = makeStyles((theme) => ({
  timelineList: {
    position: "inherit",
    padding: "0",
  },
  timelineListItemRuler: {
    padding: `0`,
    position: "inherit",
    display: "block",
  },
  timelineListItem: {
    padding: `${theme.custom.mixins.fluidLength(0.5)} 0`,
    position: "inherit",
    display: "block",
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: `${theme.custom.mixins.fluidLength(1)} 0`,
  },
  noMarketContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: `${theme.custom.mixins.fluidLength(1)} 0`,
  },
  noMarketContent: {
    margin: "auto",
  },
  noMarketIcon: {
    fontSize: theme.custom.mixins.fluidLength(5),
  },
  noMarketMessage: {
    fontSize: theme.custom.mixins.fluidLength(1.1),
  },
}));

interface Props {
  markets: Market[] | null;
  baseTime: Date | null;
}

export const TimelinesList: React.FunctionComponent<Props> = ({
  baseTime,
  markets,
}) => {
  const i18n = useIntl();

  const selectMarketsLinkMessage = i18n.formatMessage({
    id: "TimelinesList.selectMarketsLinkMessage",
    description:
      "Message encouraging user to select markets as none are selected, 1st part displayed in a link",
    defaultMessage: "Select markets",
  });

  const selectMarketsAfterLinkMessage = i18n.formatMessage({
    id: "TimelinesList.selectMarketsAfterLinkMessage",
    description:
      "Message encouraging user to select markets as none are selected, 2nd part displayed after the link",
    defaultMessage: " to display their timelines",
  });

  const classes = useStyles();
  return (
    <>
      <List className={classes.timelineList}>
        <ListItem key={`_ruler`} className={classes.timelineListItemRuler}>
          <TimelineRuler baseTime={baseTime} />
        </ListItem>
        {markets?.map((market) => {
          return (
            <ListItem key={market.id} className={classes.timelineListItem}>
              <TimelineItem baseTime={baseTime} market={market} />
            </ListItem>
          );
        })}
      </List>
      {markets?.length === 0 && (
        <Box className={classes.noMarketContainer}>
          <TimelinesIcon
            color="disabled"
            className={`${classes.noMarketContent} ${classes.noMarketIcon}`}
          />
          <FluidText {...mainFluidText} className={classes.noMarketContent}>
            <Link component={RouterLink} to={routes.marketSelection}>
              {selectMarketsLinkMessage}
            </Link>
          </FluidText>
          <FluidText {...mainFluidText} className={classes.noMarketContent}>
            {selectMarketsAfterLinkMessage}
          </FluidText>
        </Box>
      )}
      {!markets && (
        <Box className={classes.loadingContainer}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};
