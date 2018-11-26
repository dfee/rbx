type Lit = string | number | boolean | undefined | null | void | {};
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
