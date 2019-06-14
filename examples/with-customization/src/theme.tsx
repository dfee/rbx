import { makeRootValidatingTransform } from "rbx/base/helpers";
import { DEFAULTS } from "rbx/base/helpers/variables";

const COLORS = [...DEFAULTS.colors, "react"] as const;

export const themeValue = {
  transform: makeRootValidatingTransform({ colors: COLORS }),
};
