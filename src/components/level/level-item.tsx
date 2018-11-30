import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LevelItemProps = ModifierProps;

export const LevelItem = asExoticComponent<LevelItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("level-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
