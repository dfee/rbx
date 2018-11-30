import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarLinkProps = ModifierProps;

export const NavbarLink = asExoticComponent<NavbarLinkProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("navbar-link", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "span",
);
