import { config } from "config";
const { raygunAPIKey, enableCrashReporting, enableMonitoring } = config;

export const initTelemetry = (): void => {
  window.rg4js("apiKey", raygunAPIKey || "local_dev");
  window.rg4js("enableCrashReporting", enableCrashReporting);
  window.rg4js("enablePulse", enableMonitoring);
  if (config.appVersion) {
    window.rg4js("setVersion", config.appVersion);
  }
  window.rg4js("options", {
    debugMode: config.nodeEnv === "development",
  });
};

export const sendCustomTiming = (name: string, duration: number) => {
  window.rg4js("trackEvent", {
    type: "customTiming",
    name,
    duration,
  });
};

export const sendPageView = (path: string) => {
  window.rg4js("trackEvent", {
    type: "pageView",
    path,
  });
};
