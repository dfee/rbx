import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Generic, forwardRefAs } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";
import { combineRefs } from "../../utils";
import { DropdownContent } from "./dropdown-content";
import { DropdownContext } from "./dropdown-context";
import { DropdownDivider } from "./dropdown-divider";
import { DropdownItem } from "./dropdown-item";
import { DropdownMenu } from "./dropdown-menu";
import { DropdownTrigger } from "./dropdown-trigger";

export const DROPDOWN_DEFAULTS = {
  alignments: ["right"] as const,
};

export interface DropdownVariablesOverrides {}

export interface DropdownVariablesDefaults {
  alignments: (typeof DROPDOWN_DEFAULTS["alignments"])[number];
}

export type DropdownVariables = Prefer<
  DropdownVariablesOverrides,
  DropdownVariablesDefaults
>;

export type DropdownModifierProps = {
  active?: boolean;
  align?: DropdownVariables["alignments"];
  hoverable?: boolean;
  managed?: boolean;
  up?: boolean;
};

export type DropdownProps = HelpersProps & DropdownModifierProps;

export const Dropdown = Object.assign(
  forwardRefAs<DropdownProps>(
    (
      { active: _active, align, className, hoverable, managed, up, ...rest },
      ref,
    ) => {
      const [active, _setActive] = useState(
        Boolean(managed) ? Boolean(_active) : false,
      );
      const innerRef = useRef<HTMLElement>(null);

      const setActive = useCallback(
        (active: boolean) => {
          if (managed !== true) {
            _setActive(active);
          }
        },
        [managed],
      );

      useEffect(() => {
        setActive(Boolean(_active));
      }, [_active]);

      useEffect(() => {
        const handleClick = (event: MouseEvent) => {
          if (managed !== true && active && innerRef.current !== null) {
            if (
              event.target instanceof Element &&
              !innerRef.current.contains(event.target)
            ) {
              setActive(false);
            }
          }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      }, [active, managed, ref]);

      return (
        <DropdownContext.Provider value={{ active, setActive }}>
          <Generic
            className={classNames(
              "dropdown",
              {
                [`is-${align}`]: align,
                "is-active": active,
                "is-hoverable": hoverable,
                "is-up": up,
              },
              className,
            )}
            ref={combineRefs(ref, innerRef)}
            {...rest}
          />
        </DropdownContext.Provider>
      );
    },
    { as: "div" },
  ),
  {
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
  },
);

Dropdown.displayName = "Dropdown";
Dropdown.propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  up: PropTypes.bool,
};
