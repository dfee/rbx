import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileCTAProps = ModifierProps;

export const FileCTA = forwardRefAs<FileCTAProps, "span">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("file-cta", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "span");
