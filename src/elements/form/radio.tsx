import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type RadioProps = HelpersProps;

export const Radio = forwardRefAs<HTMLInputElement, RadioProps>(
  (props, ref) => <Generic ref={ref} type="radio" {...props} />,
  { as: "input" },
);

Radio.displayName = "Radio";
