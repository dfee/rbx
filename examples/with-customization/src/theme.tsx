import { Generic, makeRootValidatingTransform } from "rbx";

const COLORS = [...Generic.DEFAULTS.colors, "react"] as const;

export const themeValue = {
  transform: makeRootValidatingTransform({ colors: COLORS }),
};
