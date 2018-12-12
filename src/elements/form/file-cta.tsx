import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileCTAModifierProps = Partial<{ className: string }>;

export type FileCTAProps = ModifierProps & FileCTAModifierProps;

export const FileCTA = forwardRefAs<FileCTAProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("file-cta", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
