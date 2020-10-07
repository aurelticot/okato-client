import { getFeatureStatusFromString } from "../utils/featureUtils";

export enum FeatureStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
  HIDDEN = "HIDDEN",
}

export interface Features {
  [key: string]: Feature;
}

export class Feature {
  private readonly _status: FeatureStatus;

  constructor(status: string) {
    this._status = getFeatureStatusFromString(status);
  }

  public get getStatus(): FeatureStatus {
    return this._status;
  }

  public isHidden(): boolean {
    return this._status === FeatureStatus.HIDDEN;
  }

  public isDisabled(): boolean {
    return this._status === FeatureStatus.DISABLED;
  }

  public isEnabled(): boolean {
    return this._status === FeatureStatus.ENABLED;
  }
}
