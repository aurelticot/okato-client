import { name, version } from "../../package.json";
import { defaultUserSettings, settings } from "./settings";

const appName = name;
const appVersion = version;

const nodeEnv: string = process.env.NODE_ENV || "production";
const envType: string = process.env.REACT_APP_ENV_TYPE || "unknown";
const envId: string = process.env.REACT_APP_ENV_ID || "unknown";

const graphqlAPIEndpoint = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;

const raygunAPIKey = process.env.REACT_APP_RAYGUN_API_KEY;
const enableMonitoring = !!(process.env.REACT_APP_ENABLE_MONITORING === "true");
const enableCrashReporting = !!(
  process.env.REACT_APP_ENABLE_CRASH_REPORTING === "true"
);

const timelineVisiblePeriod = 24;
const timelineTotalPeriod = 7 * 24;

export const config = {
  appName,
  appVersion,
  nodeEnv,
  envType,
  envId,
  graphqlAPIEndpoint,
  timelineVisiblePeriod,
  timelineTotalPeriod,
  settings,
  defaultUserSettings,
  raygunAPIKey,
  enableMonitoring,
  enableCrashReporting,
};
