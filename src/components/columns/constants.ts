import { tuple } from "utils";

export const COLUMN_SIZES = tuple(
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  "three-quarters",
  "two-thirds",
  "half",
  "one-third",
  "one-quarter",
  "one-fifth",
  "two-fifths",
  "three-fifths",
  "four-fifths",
);

export type ColumnSizes = (typeof COLUMN_SIZES)[number];
