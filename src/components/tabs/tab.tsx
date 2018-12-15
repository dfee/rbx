import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type TabModifierProps = Partial<{
  active: boolean;
  className: string;
  style: React.CSSProperties;
}>;

export type TabProps = HelpersProps & TabModifierProps;

export const Tab = forwardRefAs<TabModifierProps, "a">(
  (props, ref) => {
    const { as, active, className, style, ...rest } = transformHelpers(props);
    return (
      <li
        style={style}
        className={classNames(className, {
          "is-active": active,
        })}
      >
        {React.createElement(as!, { ref, ...rest })}
      </li>
    );
  },
  { as: "a" },
);
