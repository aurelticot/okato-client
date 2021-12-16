import { BreadcrumbLevel } from "raygun4js";
import { nanoid } from "nanoid/non-secure";

interface TelemetryOptions {
  raygunAPIKey?: string;
  enableCrashReporting?: boolean;
  enableMonitoring?: boolean;
  appVersion?: string;
  debugMode?: boolean;
  breadcrumbLevel?: BreadcrumbLevel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData?: any;
  tags?: string[];
}

export const initTelemetry = ({
  raygunAPIKey = "local_dev",
  enableCrashReporting = false,
  enableMonitoring = false,
  appVersion,
  debugMode = false,
  breadcrumbLevel = "info",
  customData,
  tags,
}: TelemetryOptions): void => {
  window.rg4js("apiKey", raygunAPIKey);
  window.rg4js("enableCrashReporting", enableCrashReporting);
  window.rg4js("enablePulse", enableMonitoring);
  window.rg4js("saveIfOffline", true);
  window.rg4js("options", {
    debugMode,
    ignore3rdPartyErrors: true,
    automaticPerformanceCustomTimings: true,
  });
  window.rg4js("logContentsOfXhrCalls", true);
  setTelemetryBreadcrumbLevel(breadcrumbLevel);
  appVersion && window.rg4js("setVersion", appVersion);
  tags && window.rg4js("withTags", tags);
  customData && window.rg4js("withCustomData", customData);
};

export const sendTelemetryCustomTiming = (name: string, duration: number) => {
  window.rg4js("trackEvent", {
    type: "customTiming",
    name,
    duration,
  });
};

export const sendTelemetryPageView = (path: string) => {
  window.rg4js("trackEvent", {
    type: "pageView",
    path,
  });
};

export const sendTelemetryError = (
  error: Error,
  tags?: string[],
  customData?: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  window.rg4js("send", {
    error,
    tags,
    customData, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  });
};

export const setTelemetryBreadcrumbLevel = (level: BreadcrumbLevel) => {
  window.rg4js("setBreadcrumbLevel", level);
};

export const recordTelemetryBreadcrumb = (
  level: BreadcrumbLevel,
  message: string,
  location: string,
  metadata: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  window.rg4js(
    "recordBreadcrumb",
    {
      level,
      message,
      location,
      metadata, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    },
    metadata // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  );
};

export const startTelemetryTimer = (name: string): PerformanceMark => {
  return window.performance.mark(`${name}-${nanoid(6)}-start`);
};

export const stopTelemetryTimer = (
  name: string,
  startMark: PerformanceMark
): PerformanceMeasure => {
  return window.performance.measure(name, startMark.name);
};
