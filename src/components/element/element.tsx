import * as React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type ElementProps = ModifierProps;

export const Element = asExoticComponent<ElementProps, "div">(
  ({ as, ...props }, ref) =>
    React.createElement(as!, { ref, ...modify(props) }),
  "div",
);
