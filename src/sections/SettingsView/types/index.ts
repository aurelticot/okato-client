import { SettingValue } from "lib/types";

export interface SettingDialogConfiguration<TData = string> {
  title: string;
  selectedValue: TData;
  values: SettingValue[];
  applyValue: (value: TData) => void;
}
