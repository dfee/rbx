import { makeRootValidatingTransform } from "rbx/base/helpers";
import { DEFAULTS } from "rbx/base/helpers/variables";
import { tuple } from "rbx/utils";

const COLORS = tuple(...DEFAULTS.colors, "react");

export const themeValue = {
  transform: makeRootValidatingTransform({ colors: COLORS }),
};
