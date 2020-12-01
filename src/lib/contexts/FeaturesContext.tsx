import React, { useState, useEffect } from "react";
import { getFeatureData } from "lib/utils/APImock";

export const FeatureContext = React.createContext(getFeatureData());

export const FeaturesProvider: React.FunctionComponent = (props) => {
  const [features, setFeatures] = useState(getFeatureData());

  useEffect(() => {
    setFeatures(getFeatureData());
  }, []);

  return (
    <FeatureContext.Provider value={features}>
      {props.children}
    </FeatureContext.Provider>
  );
};
