import { tuple } from "../../utils";

export const COLORS = tuple(
  "primary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
  "white",
  "black",
  "link",
);
export type Colors = (typeof COLORS)[number];

export const SHADES = tuple(
  "black-bis",
  "black-ter",
  "grey-darker",
  "grey-dark",
  "grey",
  "grey-light",
  "grey-lighter",
  "white-ter",
  "white-bis",
);
export type Shades = (typeof SHADES)[number];
