import { execSync } from 'child_process';
import dayjs from 'dayjs';
import fs from 'fs/promises';

interface VersionInfo {
  version: string;
  commit: string;
  date: string;
}

const getVersion = (): string | null => {
  try {
    return execSync('git describe --tags --match "v*" --always | sed "s/-g[a-z0-9]{7}//"')
      .toString()
      .trim();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getRevision = (): string | null => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getContent = (): VersionInfo => {
  const version = getVersion() ?? dayjs().format('YYYY-MM-DD');
  const commit = getRevision() ?? 'No commit';
  const date = dayjs().format();

  return { version, commit, date };
};

const generateVersionInfo = async (): Promise<void> => {
  try {
    await fs.writeFile('version.json', JSON.stringify(getContent(), null, 2));
    console.log('✅ Generate `version.json`');
  } catch (error) {
    console.error(error);
    throw new Error('❌ Failed to generate `version.json`');
  }
};

generateVersionInfo();
