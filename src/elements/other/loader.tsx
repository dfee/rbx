import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LoaderModifierProps = Partial<{ className: string }>;

export type LoaderProps = ModifierProps & LoaderModifierProps;

export const Loader = forwardRefAs<LoaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("loader", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
    children: null,
  },
);
