import { FeatureStatus } from "lib/types";

export const getFeatureStatusFromString = (status: string): FeatureStatus => {
  switch (status) {
    case FeatureStatus.ENABLED:
      return FeatureStatus.ENABLED;
    case FeatureStatus.DISABLED:
      return FeatureStatus.DISABLED;
    case FeatureStatus.HIDDEN:
    default:
      return FeatureStatus.HIDDEN;
  }
};
