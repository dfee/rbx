import * as color from "./color";
import * as helpers from "./helpers";
import * as responsive from "./responsive";
import * as typography from "./typography";

export type ModifierProps = color.ColorsProps &
  helpers.HelpersProps &
  responsive.ResponsiveProps &
  typography.TypographyProps;

export const modify = <T extends object & { className?: string }>(props: T) =>
  typography.modify(responsive.modify(helpers.modify(color.modify(props))));
