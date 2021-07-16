import type { ExpoConfig } from '@expo/config';
import semver from 'semver';

import XDLError from '../XDLError';

export function gteSdkVersion(
  expJson: Pick<ExpoConfig, 'sdkVersion'>,
  sdkVersion: string
): boolean {
  if (!expJson.sdkVersion) {
    return false;
  }

  if (expJson.sdkVersion === 'UNVERSIONED') {
    return true;
  }

  try {
    return semver.gte(expJson.sdkVersion, sdkVersion);
  } catch (e) {
    throw new XDLError(
      'INVALID_VERSION',
      `${expJson.sdkVersion} is not a valid version. Must be in the form of x.y.z`
    );
  }
}
