import { sleep } from "./sleep";
export function defer<T>(next: () => T): Promise<T> {
  return sleep(0).then(next);
}
