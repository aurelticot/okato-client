import { config } from "config";
import { RaygunV2 } from "raygun4js";
const { raygunAPIKey, enableCrashReporting, enableMonitoring } = config;

export const initRaygun = (): RaygunV2 => {
  window.rg4js("apiKey", raygunAPIKey || "local_dev");
  window.rg4js("enableCrashReporting", enableCrashReporting);
  window.rg4js("enablePulse", enableMonitoring);
  if (config.appVersion) {
    window.rg4js("setVersion", config.appVersion);
  }
  window.rg4js("options", {
    debugMode: config.nodeEnv === "development",
  });
  return window.rg4js;
};

export const getRaygun = (): RaygunV2 => {
  return window.rg4js;
};

export const sendCustomTiming = (name: string, duration: number) => {
  window.rg4js("trackEvent", {
    type: "customTiming",
    name,
    duration,
  });
};
