import { config } from "config";
import winston, { createLogger, format } from "winston";
import BrowserConsole from "winston-transport-browserconsole";
import { Logtail } from "@logtail/browser";
import { LogtailTransport } from "@logtail/winston";

export const isProdLogger = config.nodeEnv === "production";

const getProdLogger = (name?: string): winston.Logger => {
  return createLogger({
    level: config.logLevel,
    format: format.combine(
      format.label({ label: name }),
      format.metadata({
        fillExcept: ["label", "level", "message"],
      }),
      format.errors({ stack: true }),
      format.json()
    ),
    transports: config.logtailSourceToken
      ? [new LogtailTransport(new Logtail(config.logtailSourceToken))]
      : [],
  });
};

const getDevLogger = (name?: string): winston.Logger => {
  return createLogger({
    level: config.logLevel,
    transports: [
      new BrowserConsole({
        format: format.combine(
          format.label({ label: name }),
          format((info) => {
            const { message, label } = info;
            return {
              ...info,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              message: `${label ? `[${label}] ` : ""}${message}`,
            };
          })(),
          winston.format.simple()
        ),
      }),
    ],
  });
};

export const getLogger = (name: string): winston.Logger => {
  return isProdLogger ? getProdLogger(name) : getDevLogger(name);
};
