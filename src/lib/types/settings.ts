export enum SettingKey {
  Theme = "theme",
  Language = "language",
  MarketSort = "marketSort",
  MarketSelection = "marketSelection",
}

export interface SettingValue {
  key: string;
  localizedLabelKey: string;
}

export interface Setting {
  key: string;
  localizedLabelKey: string;
  values: SettingValue[];
}

export interface Settings {
  [key: string]: Setting;
}

export interface UserSettings {
  [key: string]: string | string[];
}
