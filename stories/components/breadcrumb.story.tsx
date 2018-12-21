import {
  faBook,
  faHome,
  faPuzzlePiece,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Breadcrumb } from "../../src/components";
import {
  BREADCRUMB_ALIGNMENTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
} from "../../src/components/breadcrumb/breadcrumb";
import { Icon } from "../../src/elements";
import { Section } from "../../src/layout";

import { iterableToSelectObject } from "../utils";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  hasIcon: (title: string = "Has icon") => boolean(title, false),
  separator: (title: string = "Separator") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_SEPARATORS, { undefined: "" }),
      "",
    ),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_SIZES, { undefined: "" }),
      "",
    ),
};

const items = [
  { href: "#1", name: "Bulma", icon: faHome },
  { href: "#2", name: "Documentation", icon: faBook },
  { href: "#2", name: "Components", icon: faPuzzlePiece },
  { active: true, href: "#3", name: "Breadcrumbs", icon: faThumbsUp },
];

storiesOf("Components/Breadcrumb", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const align = knobs.align();
    const separator = knobs.separator();
    const hasIcon = knobs.hasIcon();
    const size = knobs.size();
    return (
      <Breadcrumb
        align={align || undefined}
        separator={separator || undefined}
        size={size || undefined}
      >
        {items.map(({ active, href, icon, name }, i) => (
          <Breadcrumb.Item active={active} href={href} key={i}>
            {hasIcon && (
              <Icon size="small">
                <FontAwesomeIcon icon={icon} />
              </Icon>
            )}
            {name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  });
