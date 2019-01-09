import {
  faBook,
  faHome,
  faPuzzlePiece,
  faThumbsUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Breadcrumb } from "src/components";
import { BREADCRUMB_DEFAULTS } from "src/components/breadcrumb/breadcrumb";
import { Icon } from "src/elements";
import { Section } from "src/layout";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_DEFAULTS.alignments, { undefined: "" }),
      "",
    ),
  hasIcon: (title: string = "Has icon") => boolean(title, false),
  separator: (title: string = "Separator") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_DEFAULTS.separators, { undefined: "" }),
      "",
    ),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(BREADCRUMB_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Components/Breadcrumb", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      align: knobs.align(),
      separator: knobs.separator(),
      size: knobs.size(),
    });
    const hasIcon = knobs.hasIcon();

    type BreadcrumbItemAttributes = {
      active?: boolean;
      href: string;
      name: string;
      icon: IconDefinition;
    };

    const breadcrumbItems: BreadcrumbItemAttributes[] = [
      { href: "#1", name: "Bulma", icon: faHome },
      { href: "#2", name: "Documentation", icon: faBook },
      { href: "#2", name: "Components", icon: faPuzzlePiece },
      { active: true, href: "#3", name: "Breadcrumbs", icon: faThumbsUp },
    ];

    const makeBreadcrumbItem = (attrs: BreadcrumbItemAttributes) => {
      const icon = hasIcon ? (
        <Icon size="small">
          <FontAwesomeIcon icon={attrs.icon} />
        </Icon>
      ) : (
        undefined
      );

      return (
        <Breadcrumb.Item active={attrs.active} href={attrs.href}>
          {icon}
          {attrs.name}
        </Breadcrumb.Item>
      );
    };

    return (
      <Breadcrumb {...props}>
        {breadcrumbItems.map(makeBreadcrumbItem)}
      </Breadcrumb>
    );
  });
