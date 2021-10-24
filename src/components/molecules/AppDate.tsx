import React from "react";
import { useIntl } from "react-intl";
import { useRealTime } from "lib/hooks";
import { DateTime } from "luxon";
import { FluidTypography } from "components/atoms";
import { getFluidTextValues } from "lib/utils";

const mainFluidText = getFluidTextValues(1);

interface Props {
  time: Date | null;
}

const RawAppDate: React.FunctionComponent<Props> = ({ time }) => {
  const realtime = useRealTime();
  const i18n = useIntl();

  const labelToday = i18n.formatMessage({
    id: "AppDate.today",
    defaultMessage: "Today",
    description: "Message displayed when the date is today, the current date",
  });

  if (!time) {
    return <FluidTypography {...mainFluidText}>{labelToday}</FluidTypography>;
  }

  const realDateTime = DateTime.fromJSDate(realtime);
  const dateTime = DateTime.fromJSDate(time);

  if (dateTime.hasSame(realDateTime, "day")) {
    return <FluidTypography {...mainFluidText}>{labelToday}</FluidTypography>;
  }

  const labelTomorrow = i18n.formatMessage({
    id: "AppDate.tomorrow",
    defaultMessage: "Tomorrow",
    description: "Message displayed when the date is tomorrow",
  });
  const labelYesterday = i18n.formatMessage({
    id: "AppDate.yesterday",
    defaultMessage: "Yesterday",
    description: "Message displayed when the date is yesterday",
  });

  if (dateTime.hasSame(realDateTime.plus({ days: 1 }), "day")) {
    return (
      <FluidTypography {...mainFluidText}>{labelTomorrow}</FluidTypography>
    );
  }

  if (dateTime.hasSame(realDateTime.minus({ days: 1 }), "day")) {
    return (
      <FluidTypography {...mainFluidText}>{labelYesterday}</FluidTypography>
    );
  }

  return (
    <FluidTypography {...mainFluidText}>
      {i18n.formatDate(time)}
    </FluidTypography>
  );
};

export const AppDate = React.memo(RawAppDate);
