import React from "react";
import { Box } from "@material-ui/core";
import { useIntl } from "react-intl";
import { useRealTime } from "../hooks";
import { DateTime } from "luxon";

interface AppDateProps {
  time: Date | null;
}

export const AppDate: React.FC<AppDateProps> = ({ time }) => {
  const realtime = useRealTime();
  const i18n = useIntl();

  const labelToday = i18n.formatMessage({
    id: "AppDate.today",
    defaultMessage: "Today",
  });

  if (!time) {
    return <Box>{labelToday}</Box>;
  }

  const realDateTime = DateTime.fromJSDate(realtime);
  const dateTime = DateTime.fromJSDate(time);

  if (dateTime.hasSame(realDateTime, "day")) {
    return <Box>{labelToday}</Box>;
  }

  const labelTomorrow = i18n.formatMessage({
    id: "AppDate.tomorrow",
    defaultMessage: "Tomorrow",
  });
  const labelYesterday = i18n.formatMessage({
    id: "AppDate.yesterday",
    defaultMessage: "Yesterday",
  });

  if (dateTime.hasSame(realDateTime.plus({ day: 1 }), "day")) {
    return <Box>{labelTomorrow}</Box>;
  }

  if (dateTime.hasSame(realDateTime.minus({ day: 1 }), "day")) {
    return <Box>{labelYesterday}</Box>;
  }

  return <Box>{i18n.formatDate(time)}</Box>;
};
