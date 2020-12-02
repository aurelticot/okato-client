import { RaygunV2 } from "raygun4js";

declare global {
  interface Window {
    rg4js: RaygunV2;
  }
}
