import React from "react";
import { Box, Link, List, ListItem } from "@mui/material";
import { ClearAll as TimelinesIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { Market } from "lib/types";
import { FluidTypography } from "components/atoms";
import { TimelineItem, TimelinesListSkeleton } from "components/organisms";
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

  if (!markets) {
    return <TimelinesListSkeleton nbItems={nbMarketsLoading} />;
  }

  const noMarketSelectedMessage = i18n.formatMessage({
    id: "TimelinesList.noMarketSelectedMessage",
    defaultMessage: "No market selected",
    description:
      "Message in the timeline list that stating no market has been selected",
  });

  const goToMarketSelectionLinkMessage = i18n.formatMessage({
    id: "TimelinesList.goToMarketSelectionLinkMessage",
    defaultMessage: "Go to Market Selection",
    description:
      "Message encouraging user to go select markets displayed as a link",
  });

  return (
    <>
      <List
        sx={{
          position: "inherit",
          p: 0,
        }}
      >
        {markets?.map((market) => (
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
        ))}
      </List>
      {markets?.length === 0 && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            my: (theme) => theme.custom.mixins.fluidLength(2),
            mx: 0,
          }}
        >
          <FluidTypography
            {...mainFluidText}
            variant="body2"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(1.1),
            }}
          >
            {noMarketSelectedMessage}
          </FluidTypography>
          <TimelinesIcon
            color="disabled"
            sx={{
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(5),
            }}
          />
          <FluidTypography
            {...mainFluidText}
            variant="body2"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              margin: "auto",
              fontSize: (theme) => theme.custom.mixins.fluidLength(1.1),
            }}
          >
            <Link component={RouterLink} to={routes.marketSelection}>
              {goToMarketSelectionLinkMessage}
            </Link>
          </FluidTypography>
        </Box>
      )}
    </>
  );
};
