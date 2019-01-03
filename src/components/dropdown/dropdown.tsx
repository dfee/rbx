import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs } from "src/base";
import { Omit } from "src/types";
import {
  DROPDOWN_ALIGNMENTS,
  DropdownContainer,
  DropdownContainerProps,
} from "./dropdown-container";
import { DropdownContent } from "./dropdown-content";
import { DropdownContext } from "./dropdown-context";
import { DropdownDivider } from "./dropdown-divider";
import { DropdownItem } from "./dropdown-item";
import { DropdownMenu } from "./dropdown-menu";
import { DropdownTrigger } from "./dropdown-trigger";

export type DropdownProps = Omit<DropdownContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOf(DROPDOWN_ALIGNMENTS),
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  up: PropTypes.bool,
};

export const Dropdown = Object.assign(
  forwardRefAs<DropdownProps, "div">(
    (props, ref) => <DropdownContainer innerRef={ref} {...props} />,
    { as: "div" },
  ),
  {
    Container: DropdownContainer,
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
    propTypes,
  },
);
