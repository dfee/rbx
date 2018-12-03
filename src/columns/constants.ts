import { tuple } from "@/utils";

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
  "one-third",
  "two-thirds",
  "one-quarter",
  "half",
  "three-quarters",
  "one-fifth",
  "two-fifths",
  "three-fifths",
  "four-fifths",
  "full",
);

export type ColumnSizes = (typeof COLUMN_SIZES)[number];

export const COLUMNS_GAP_SIZES = tuple(0, 1, 2, 3, 4, 5, 6, 7, 8);
export type ColumnsGapSizes = (typeof COLUMNS_GAP_SIZES)[number];
