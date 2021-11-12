import { name, version } from "../../package.json";
import { defaultUserSettings, settings } from "./settings";

const appName = name;
const appVersion = version;

const nodeEnv = process.env.NODE_ENV || "development";
const envType: string = process.env.REACT_APP_ENV_TYPE || "unknown";
const envId: string = process.env.REACT_APP_ENV_ID || "unknown";

const logLevel =
  process.env.REACT_APP_LOG_LEVEL ||
  (nodeEnv === "production" ? "info" : "debug");

const graphqlAPIEndpoint = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;

const raygunAPIKey = process.env.REACT_APP_RAYGUN_API_KEY;
const enableMonitoring = !!(process.env.REACT_APP_ENABLE_MONITORING === "true");
const enableCrashReporting = !!(
  process.env.REACT_APP_ENABLE_CRASH_REPORTING === "true"
);

const logtailSourceToken = process.env.REACT_APP_LOGTAIL_SOURCE_TOKEN;

const timelineVisiblePeriod = 24;
const timelineTotalPeriod = 7 * 24;

export const config = {
  appName,
  appVersion,
  nodeEnv,
  envType,
  envId,
  logLevel,
  graphqlAPIEndpoint,
  timelineVisiblePeriod,
  timelineTotalPeriod,
  settings,
  defaultUserSettings,
  raygunAPIKey,
  enableMonitoring,
  enableCrashReporting,
  logtailSourceToken,
};
