import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type SelectOptionProps = HelpersProps;

export const SelectOption = forwardRefAs<SelectOptionProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "option" },
);

SelectOption.displayName = "Select.Option";
