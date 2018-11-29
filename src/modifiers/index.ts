import * as colors from "./colors";
import * as helpers from "./helpers";
import * as responsives from "./responsives";
import * as typography from "./typography";

export type ModifierProps = colors.ColorsProps &
  helpers.HelpersProps &
  responsives.ResponsivesProps &
  typography.TypographyProps;

export const modify = <T extends object & { className?: string }>(props: T) =>
  typography.modify(responsives.modify(helpers.modify(colors.modify(props))));
