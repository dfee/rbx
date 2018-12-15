import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type FileNameModifierProps = Partial<{ className: string }>;

export type FileNameProps = ModifierProps & FileNameModifierProps;

export const FileName = forwardRefAs<FileNameProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("file-name", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
