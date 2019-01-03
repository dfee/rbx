import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type SelectOptionProps = HelpersProps;

export const SelectOption = forwardRefAs<SelectOptionProps, "option">(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "option" },
);
