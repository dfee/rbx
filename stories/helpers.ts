import { boolean, select } from "@storybook/addon-knobs";

export interface BaseFactoryOptions {
  title?: string;
  group?: string;
}

export interface BooleanFactoryOptions extends BaseFactoryOptions {
  initial?: boolean;
}

export interface SelectFactoryOptions extends BaseFactoryOptions {
  initial?: string;
}

export const booleanFactory = (
  title: string,
  initial: boolean,
  group?: string,
) => (options?: BooleanFactoryOptions) => {
  const compiled = Object.assign({}, { title, initial, group }, options);
  return boolean(compiled.title, compiled.initial, compiled.group);
};

export const selectFactory = (
  title: string,
  choices: any,
  initial: string = "",
  group?: string,
) => (options?: SelectFactoryOptions) => {
  const compiled = Object.assign({ title, initial, group }, options);
  return select(compiled.title, choices, compiled.initial, compiled.group);
};

export const iterableToSelectObject = (
  elements: Array<string | number>,
  initial: {} = {},
) =>
  elements
    .map(element => ({ [`${element}`]: `${element}` }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), initial);

export const titleize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
