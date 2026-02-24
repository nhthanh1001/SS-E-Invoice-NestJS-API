import { v4 } from 'uuid';

export const getProcessId = (prefix?: string): string => {
  if (prefix) {
    return `${prefix}-${v4()}`;
  }
  return v4();
};
