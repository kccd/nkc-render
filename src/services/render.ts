import {renderFile} from 'pug';
import {AccessFile} from '../modules/file';
import {GetRenderConfigs} from '../modules/configs';
import {HttpErrorCodes, HttpErrorTypes, ThrowHttpError} from '../modules/error';
const renderConfigs = GetRenderConfigs();

export async function RenderPug(
  filePath: string,
  remoteState: unknown,
  data: unknown,
) {
  if (!(await AccessFile(filePath))) {
    ThrowHttpError(
      HttpErrorCodes.BadGateway,
      HttpErrorTypes.ERR_INVALID_PUG_FILE_PATH,
    );
  }
  const includedModules = {};
  return renderFile(filePath, {
    remoteState,
    data,
    cache: renderConfigs.cache,
    isIncluded(name: string) {
      return isIncluded(includedModules, name);
    },
    objToStr,
  });
}

function isIncluded(data: {[propName: string]: boolean}, name: string) {
  if (data[name]) return true;
  data[name] = true;
  return false;
}

function objToStr(obj: object) {
  return encodeURIComponent(JSON.stringify(obj));
}
