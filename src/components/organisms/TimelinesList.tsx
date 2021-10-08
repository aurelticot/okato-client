import React from "react";
import { Box, Link, List, ListItem } from "@mui/material";
import { ClearAll as TimelinesIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { Market } from "lib/types";
import { FluidTypography } from "components/atoms";
import { TimelineItemSkeleton } from "components/molecules";
import { TimelineItem, TimelineRuler } from "components/organisms";
import { getFluidTextValues } from "lib/utils";
import { routes } from "lib/constants";

const mainFluidText = getFluidTextValues(1.1);

interface Props {
  markets: Market[] | null;
  baseTime: Date | null;
  nbMarketsLoading: number;
}

export const TimelinesList: React.FunctionComponent<Props> = ({
  baseTime,
  markets,
  nbMarketsLoading,
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

  const nbSkeletons = nbMarketsLoading ? Math.min(nbMarketsLoading, 5) : 5;
  return (
    <>
      <List
        sx={{
          position: "inherit",
          p: 0,
        }}
      >
        <ListItem
          key={`_ruler`}
          sx={{
            p: 0,
            position: "inherit",
            display: "block",
          }}
        >
          <TimelineRuler baseTime={baseTime} />
        </ListItem>
        {!markets &&
          [...Array(nbSkeletons).keys()].reverse().map((index) => (
            <>
              <ListItem
                key={`_skeleton_${index}`}
                sx={{
                  py: (theme) => theme.custom.mixins.fluidLength(0.5),
                  px: 0,
                  position: "inherit",
                  display: "block",
                }}
              >
                <TimelineItemSkeleton intensity={(index + 1) / nbSkeletons} />
              </ListItem>
            </>
          ))}
        {markets?.map((market) => {
          return (
            <ListItem
              key={market.id}
              sx={{
                py: (theme) => theme.custom.mixins.fluidLength(0.5),
                px: 0,
                position: "inherit",
                display: "block",
              }}
            >
              <TimelineItem baseTime={baseTime} market={market} />
            </ListItem>
          );
        })}
      </List>
      {markets?.length === 0 && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            my: (theme) => theme.custom.mixins.fluidLength(1),
            mx: 0,
          }}
        >
          <TimelinesIcon
            color="disabled"
            sx={{
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(5),
            }}
          />
          <FluidTypography
            {...mainFluidText}
            sx={{
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(1.1),
            }}
          >
            <Link component={RouterLink} to={routes.marketSelection}>
              {selectMarketsLinkMessage}
            </Link>
          </FluidTypography>
          <FluidTypography
            {...mainFluidText}
            sx={{
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(1.1),
            }}
          >
            {selectMarketsAfterLinkMessage}
          </FluidTypography>
        </Box>
      )}
    </>
  );
};
