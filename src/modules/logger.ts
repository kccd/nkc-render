export function InfoLog(content: string) {
  console.log(content);
}

export function WarningLog(content: string) {
  console.warn(content);
}

export function ErrorLog(err: Error | string) {
  console.error(err);
}
