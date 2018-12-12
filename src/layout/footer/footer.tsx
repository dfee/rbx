import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FooterModifierProps = Partial<{ className: string }>;

export type FooterProps = ModifierProps & FooterModifierProps;

export const Footer = forwardRefAs<FooterProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("footer", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
