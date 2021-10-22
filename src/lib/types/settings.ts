export enum SettingKey {
  Theme = "theme",
  Language = "language",
  MarketSort = "marketSort",
  MarketSelection = "marketSelection",
}

export interface LabelMessage {
  id?: string;
  defaultMessage: string;
  description: string;
}

export interface SettingValue {
  key: string;
  labelMessage: LabelMessage;
}

export interface Setting {
  key: string;
  labelMessage: LabelMessage;
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
