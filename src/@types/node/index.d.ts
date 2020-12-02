declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "production" | "development" | "test";
    EXTEND_ESLINT?: "true" | "false";
    REACT_APP_GRAPHQL_API_ENDPOINT?: string;
    REACT_APP_ENVIRONMENT_ID?: string;
    REACT_APP_RAYGUN_API_KEY?: string;
    REACT_APP_ENABLE_CRASH_REPORTING?: "true" | "false";
    REACT_APP_ENABLE_MONITORING?: "true" | "false";
  }
}
