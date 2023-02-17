import { name, version } from "../../package.json";
import { defaultUserSettings, settings } from "./settings";

const appName = name;
const appVersion = version;

const nodeEnv = process.env.NODE_ENV || "development";

const graphqlAPIEndpoint = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;

const timelineVisiblePeriod = 24;
const timelineTotalPeriod = 7 * 24;

export const config = {
  appName,
  appVersion,
  nodeEnv,
  graphqlAPIEndpoint,
  timelineVisiblePeriod,
  timelineTotalPeriod,
  settings,
  defaultUserSettings,
};
