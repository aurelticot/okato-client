import React from "react";
import { Typography } from "@material-ui/core";
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
    return <Typography>{labelToday}</Typography>;
  }

  const realDateTime = DateTime.fromJSDate(realtime);
  const dateTime = DateTime.fromJSDate(time);

  if (dateTime.hasSame(realDateTime, "day")) {
    return <Typography>{labelToday}</Typography>;
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
    return <Typography>{labelTomorrow}</Typography>;
  }

  if (dateTime.hasSame(realDateTime.minus({ day: 1 }), "day")) {
    return <Typography>{labelYesterday}</Typography>;
  }

  return <Typography>{i18n.formatDate(time)}</Typography>;
};
