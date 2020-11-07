import React from "react";
import { useIntl } from "react-intl";
import { useRealTime } from "../hooks";
import { DateTime } from "luxon";
import { FluidText } from "./FluidText";
import { getFluidTextValues } from "../utils";

const mainFluidText = getFluidTextValues(1);

interface AppDateProps {
  time: Date | null;
}

export const AppDate: React.FunctionComponent<AppDateProps> = ({ time }) => {
  const realtime = useRealTime();
  const i18n = useIntl();

  const labelToday = i18n.formatMessage({
    id: "AppDate.today",
    defaultMessage: "Today",
  });

  if (!time) {
    return <FluidText {...mainFluidText}>{labelToday}</FluidText>;
  }

  const realDateTime = DateTime.fromJSDate(realtime);
  const dateTime = DateTime.fromJSDate(time);

  if (dateTime.hasSame(realDateTime, "day")) {
    return <FluidText {...mainFluidText}>{labelToday}</FluidText>;
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
    return <FluidText {...mainFluidText}>{labelTomorrow}</FluidText>;
  }

  if (dateTime.hasSame(realDateTime.minus({ day: 1 }), "day")) {
    return <FluidText {...mainFluidText}>{labelYesterday}</FluidText>;
  }

  return <FluidText {...mainFluidText}>{i18n.formatDate(time)}</FluidText>;
};
