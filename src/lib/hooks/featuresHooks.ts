import { useContext } from "react";
import { FeatureContext } from "../../contexts/FeaturesProvider";
import { Feature } from "../types";

const emptyFeature = new Feature("hidden");

export const useFeature = (featureName: string): Feature => {
  const features = useContext(FeatureContext);
  const feature = features[featureName];
  return feature ? feature : emptyFeature;
};
