import { SettingKey, Settings, MarketSortingMethod } from "../lib/types";

export const settings: Settings = {
  [SettingKey.Theme]: {
    key: SettingKey.Theme,
    localizedLabelKey: "settings.theme.label",
    values: [
      { key: "system", localizedLabelKey: "settings.theme.value.system.label" },
      { key: "black", localizedLabelKey: "settings.theme.value.black.label" },
      { key: "dark", localizedLabelKey: "settings.theme.value.dark.label" },
      { key: "light", localizedLabelKey: "settings.theme.value.light.label" },
    ],
  },
  [SettingKey.Language]: {
    key: SettingKey.Language,
    localizedLabelKey: "settings.language.label",
    values: [
      {
        key: "system",
        localizedLabelKey: "settings.language.value.system.label",
      },
      { key: "en", localizedLabelKey: "settings.language.value.en.label" },
      { key: "fr", localizedLabelKey: "settings.language.value.fr.label" },
    ],
  },
  [SettingKey.MarketSort]: {
    key: SettingKey.MarketSort,
    localizedLabelKey: "settings.marketSort.label",
    values: [
      {
        key: MarketSortingMethod.Capitalisation,
        localizedLabelKey: "settings.marketSort.value.capitalisation.label",
      },
      {
        key: MarketSortingMethod.Alphabetically,
        localizedLabelKey: "settings.marketSort.value.alphabetically.label",
      },
      {
        key: MarketSortingMethod.Chronologically,
        localizedLabelKey: "settings.marketSort.value.chronologically.label",
      },
      {
        key: MarketSortingMethod.CapitalisationReverse,
        localizedLabelKey:
          "settings.marketSort.value.capitalisationReverse.label",
      },
      {
        key: MarketSortingMethod.AlphabeticallyReverse,
        localizedLabelKey:
          "settings.marketSort.value.alphabeticallyReverse.label",
      },
      {
        key: MarketSortingMethod.ChronologicallyReverse,
        localizedLabelKey:
          "settings.marketSort.value.chronologicallyReverse.label",
      },
    ],
  },
};
