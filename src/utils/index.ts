export const getObjectValues = <T>(obj: Record<string, T>) => {
  return Object.values(obj) as T[];
};
