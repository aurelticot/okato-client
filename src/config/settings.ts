import { defineMessage } from "react-intl";
import {
  SettingKey,
  Settings,
  MarketSortingMethod,
  TimeFormat,
} from "lib/types";
import { supportedLanguageSettingsValues } from "lib/lang";

export const settings: Settings = {
  [SettingKey.Theme]: {
    key: SettingKey.Theme,
    labelMessage: defineMessage({
      id: "settings.theme.label",
      defaultMessage: "Theme",
      description: "Label of the Setting 'theme'",
    }),
    values: [
      {
        key: "system",
        labelMessage: defineMessage({
          id: "settings.theme.value.system.label",
          defaultMessage: "System default",
          description: "Label of the option 'system' for the Setting Theme",
        }),
      },
      {
        key: "black",
        labelMessage: defineMessage({
          id: "settings.theme.value.black.label",
          defaultMessage: "Black",
          description: "Label of the option 'black' for the Setting Theme",
        }),
      },
      {
        key: "dark",
        labelMessage: defineMessage({
          id: "settings.theme.value.dark.label",
          defaultMessage: "Dark",
          description: "Label of the option 'dark' for the Setting Theme",
        }),
      },
      {
        key: "light",
        labelMessage: defineMessage({
          id: "settings.theme.value.light.label",
          defaultMessage: "Light",
          description: "Label of the option 'light' for the Setting Theme",
        }),
      },
      {
        key: "white",
        labelMessage: defineMessage({
          id: "settings.theme.value.white.label",
          defaultMessage: "White",
          description: "Label of the option 'white' for the Setting Theme",
        }),
      },
    ],
  },
  [SettingKey.Language]: {
    key: SettingKey.Language,
    labelMessage: defineMessage({
      id: "settings.language.label",
      defaultMessage: "Language",
      description: "Label of the Setting 'language'",
    }),
    values: [
      {
        key: "system",
        labelMessage: defineMessage({
          id: "settings.language.value.system.label",
          defaultMessage: "System default",
          description: "Label of the option 'system' for the Setting Language",
        }),
      },
      ...supportedLanguageSettingsValues,
    ],
  },
  [SettingKey.TimeFormat]: {
    key: SettingKey.TimeFormat,
    labelMessage: defineMessage({
      id: "settings.timeFormat.label",
      defaultMessage: "Time format",
      description: "Label of the Setting 'timeFormat'",
    }),
    values: [
      {
        key: TimeFormat.System,
        labelMessage: defineMessage({
          id: "settings.timeFormat.value.system.label",
          defaultMessage: "System default",
          description:
            "Label of the option 'system' for the Setting Time format",
        }),
      },
      {
        key: TimeFormat.Hour12,
        labelMessage: defineMessage({
          id: "settings.timeFormat.value.hour12.label",
          defaultMessage: "12-hour",
          description:
            "Label of the option 'hour12' for the Setting Time format",
        }),
      },
      {
        key: TimeFormat.Hour24,
        labelMessage: defineMessage({
          id: "settings.timeFormat.value.hour24.label",
          defaultMessage: "24-hour",
          description:
            "Label of the option 'hour24' for the Setting Time format",
        }),
      },
    ],
  },
  [SettingKey.MarketSort]: {
    key: SettingKey.MarketSort,
    labelMessage: defineMessage({
      id: "settings.marketSort.label",
      defaultMessage: "Market sorting",
      description: "Label of the Setting 'market sorting'",
    }),
    values: [
      {
        key: MarketSortingMethod.CAPITALISATION,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.capitalisation.label",
          defaultMessage: "Capitalisation",
          description:
            "Label of the option 'capitalisation' for the Setting Market Sorting",
        }),
      },
      {
        key: MarketSortingMethod.ALPHABETICALLY,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.alphabetically.label",
          defaultMessage: "Alphabetically",
          description:
            "Label of the option 'alphabetic' for the Setting Market Sorting",
        }),
      },
      {
        key: MarketSortingMethod.CHRONOLOGICALLY,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.chronologically.label",
          defaultMessage: "Chronologically",
          description:
            "Label of the option 'chronologic' for the Setting Market Sorting",
        }),
      },
      {
        key: MarketSortingMethod.CAPITALISATION_REVERSE,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.capitalisationReverse.label",
          defaultMessage: "Capitalisation (reverse)",
          description:
            "Label of the option 'capitalisation reverse' for the Setting Market Sorting",
        }),
      },
      {
        key: MarketSortingMethod.ALPHABETICALLY_REVERSE,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.alphabeticallyReverse.label",
          defaultMessage: "Alphabetically (reverse)",
          description:
            "Label of the option 'alphabetic reverse' for the Setting Market Sorting",
        }),
      },
      {
        key: MarketSortingMethod.CHRONOLOGICALLY_REVERSE,
        labelMessage: defineMessage({
          id: "settings.marketSort.value.chronologicallyReverse.label",
          defaultMessage: "Chronologically (reverse)",
          description:
            "Label of the option 'chronologic reverse' for the Setting Market Sorting",
        }),
      },
    ],
  },
};
