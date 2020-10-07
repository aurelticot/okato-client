import { SettingKey, UserSettings, MarketSortingMethod } from "../lib/types";
import { settings } from "./settings";

const timelineVisiblePeriod = 24;
const daysInPast = 2;
const daysRequestedInPast = daysInPast + 1;
const daysInFuture = 2;
const daysRequestedInFuture = daysInFuture + 1;

const defaultUserSettings: UserSettings = {
  [SettingKey.Theme]: "system",
  [SettingKey.Language]: "system",
  [SettingKey.MarketSelection]: ["NYSE", "NASDAQ", "EURONEXT"],
  [SettingKey.MarketSort]: MarketSortingMethod.CHRONOLOGICALLY,
};

export const config = {
  timelineVisiblePeriod,
  daysInPast,
  daysRequestedInPast,
  daysInFuture,
  daysRequestedInFuture,
  settings,
  defaultUserSettings,
};
