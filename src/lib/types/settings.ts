import { MessageDescriptor } from "react-intl";

export enum SettingKey {
  Theme = "theme",
  Language = "language",
  TimeFormat = "timeFormat",
  MarketSort = "marketSort",
  MarketSelection = "marketSelection",
}

export enum TimeFormat {
  System = "system",
  Hour12 = "12-hour",
  Hour24 = "24-hour",
}

export interface SettingValue {
  key: string;
  labelMessage: string | MessageDescriptor;
}

export interface Setting {
  key: string;
  labelMessage: MessageDescriptor;
  values: SettingValue[];
}

export interface Settings {
  [key: string]: Setting;
}

export interface UserSettings {
  [key: string]: string | string[];
}

export interface SettingDialogConfiguration<TData = string> {
  title: string;
  selectedValue: TData;
  values: SettingValue[];
  applyValue: (value: TData) => void;
}
