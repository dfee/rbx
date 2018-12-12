import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ModalCardBody } from "./modal-card-body";
import { ModalCardFoot } from "./modal-card-foot";
import { ModalCardHead } from "./modal-card-head";
import { ModalCardTitle } from "./modal-card-title";

export type ModalCardProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const ModalCard = Object.assign(
  forwardRefAs<ModalCardProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("modal-card", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
  },
);
