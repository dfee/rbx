export const lexSortObj = <T extends object>(obj: { [K: string]: T }) =>
  Object.keys(obj)
    .sort((a, b) => (a < b ? -1 : a === b ? 0 : 1))
    .map(key => ({ key, value: obj[key] }));
