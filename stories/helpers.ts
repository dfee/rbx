export const iterableToSelectObject = (
  elements: Array<string | number>,
  initial: {} = {},
) =>
  elements
    .map(element => ({ [`${element}`]: `${element}` }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), initial);

export const titleize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
