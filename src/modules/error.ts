import Moleculer from 'moleculer';
import MoleculerError = Moleculer.Errors.MoleculerError;
import {ErrorLog} from './logger';

export const HttpErrorCodes = {
  OK: 200,
  MovedPermanently: 301,
  BadRequest: 400,
  UnAuthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
};

export const HttpErrorTypes = {
  ERR_INVALID_PUG_FILE_PATH: 'ERR_INVALID_PUG_FILE_PATH',
};

export function ThrowHttpError(
  code: number,
  type: string,
  error: string | Error = '',
): MoleculerError {
  let stackInfo;
  let messageInfo;
  if (typeof error === 'string') {
    stackInfo = error;
    messageInfo = error;
  } else {
    stackInfo = error.stack || error.message || error.toString();
    messageInfo = error.message || '';
  }
  ErrorLog(
    `ERR_CODE: ${code.toString()}\nERR_TYPE: ${type}\nERR_MESSAGE: ${stackInfo}`,
  );
  throw new MoleculerError(messageInfo, code, type);
}
