import { getFeatureStatusFromString } from "../utils/featureUtils";

export enum FeatureStatus {
  Enabled = "enabled",
  Disabled = "disabled",
  Hidden = "hidden",
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
    return this._status === FeatureStatus.Hidden;
  }

  public isDisabled(): boolean {
    return this._status === FeatureStatus.Disabled;
  }

  public isEnabled(): boolean {
    return this._status === FeatureStatus.Enabled;
  }
}
