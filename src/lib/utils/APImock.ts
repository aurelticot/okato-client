import { Feature, Features } from "lib/types";

export function getFeatureData(): Features {
  return {
    bookmark: new Feature("HIDDEN"),
    reminder: new Feature("HIDDEN"),
  };
}
