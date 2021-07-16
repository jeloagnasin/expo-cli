import fs from 'fs-extra';
import path from 'path';

import UserSettings from '../UserSettings';
import * as Versions from '../Versions';
import { downloadAppAsync } from './downloadAppAsync';

function _apkCacheDirectory() {
  const dotExpoHomeDirectory = UserSettings.dotExpoHomeDirectory();
  const dir = path.join(dotExpoHomeDirectory, 'android-apk-cache');
  fs.mkdirpSync(dir);
  return dir;
}

export async function downloadApkAsync(
  url?: string,
  downloadProgressCallback?: (roundedProgress: number) => void
) {
  if (!url) {
    const versions = await Versions.versionsAsync();
    url = versions.androidUrl;
  }

  const filename = path.parse(url).name;
  const apkPath = path.join(_apkCacheDirectory(), `${filename}.apk`);

  if (await fs.pathExists(apkPath)) {
    return apkPath;
  }

  await downloadAppAsync(url, apkPath, undefined, downloadProgressCallback);
  return apkPath;
}
