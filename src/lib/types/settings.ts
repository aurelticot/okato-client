import { MessageDescriptor } from "react-intl";

export enum SettingKey {
  Theme = "theme",
  Language = "language",
  MarketSort = "marketSort",
  MarketSelection = "marketSelection",
}

export interface SettingValue {
  key: string;
  labelMessage: MessageDescriptor;
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
