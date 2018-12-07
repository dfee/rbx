import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileLabelProps = ModifierProps;

export const FileLabel = forwardRefAs<FileLabelProps, "label">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("file-label", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "label");
