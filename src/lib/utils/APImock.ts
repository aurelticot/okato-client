import { Feature, Features } from "../types";

export function getFeatureData(): Features {
  return {
    bookmark: new Feature("HIDDEN"),
    reminder: new Feature("HIDDEN"),
  };
}
