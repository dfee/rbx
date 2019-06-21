export const lexSortObj = <T extends object>(obj: { [K: string]: T }) =>
  Object.keys(obj)
    .sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a === b) {
        return 0;
      }
      return 1;
    })
    .map(key => ({ key, value: obj[key] }));
