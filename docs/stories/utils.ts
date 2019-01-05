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
  const compiled = { title, initial, group, ...options };

  return boolean(compiled.title, compiled.initial, compiled.group);
};

export const selectFactory = (
  title: string,
  choices: { [K: string]: string },
  initial: string = "",
  group?: string,
) => (options?: SelectFactoryOptions) => {
  const compiled = { title, initial, group, ...options };

  return select(compiled.title, choices, compiled.initial, compiled.group);
};

export const iterableToSelectObject = (
  elements: (string | number)[],
  initial: {} = {},
) =>
  elements
    .map(element => ({ [`${element}`]: `${element}` }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), initial);

export const titleize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// tslint:disable-next-line:no-any
export const filterUndefined = (props: { [k: string]: any }) =>
  Object.keys(props)
    .filter(key => props[key] !== "")
    .map(key => ({ [key]: props[key] }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

export const mapFactories = <
  T extends {
    [K: string]: (options: BaseFactoryOptions) => boolean | string;
  }
>(
  obj: T,
  group?: string,
) =>
  Object.keys(obj)
    .map(key => ({ [key]: obj[key]({ group }) }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});
