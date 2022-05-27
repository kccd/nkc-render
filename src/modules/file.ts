import {promises} from 'fs';

export async function AccessFile(targetPath: string) {
  try {
    await promises.access(targetPath);
    return true;
  } catch (err) {
    return false;
  }
}
