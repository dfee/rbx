import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FooterModifierProps = Partial<{
  children: React.ReactNode;
}>;

export type FooterProps = ModifierProps & FooterModifierProps;

export const Footer = asExoticComponent<FooterProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("footer", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
