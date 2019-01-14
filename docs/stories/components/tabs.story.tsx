import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Tab } from "src/components";
import { TAB_GROUP_DEFAULTS } from "src/components/tabs/tab-group";
import { Section } from "src/layout";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  align: (title: string = "Align") =>
    select(
      title,
      iterableToSelectObject(TAB_GROUP_DEFAULTS.alignments, { undefined: "" }),
      "",
    ),
  fullwidth: (title: string = "Fullwidth") => boolean(title, false),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(TAB_GROUP_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
  type: (title: string = "Type") =>
    select(
      title,
      iterableToSelectObject(TAB_GROUP_DEFAULTS.types, { undefined: "" }),
      "",
    ),
};

storiesOf("Components/Tabs", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      align: knobs.align(),
      fullwidth: knobs.fullwidth(),
      size: knobs.size(),
      type: knobs.type(),
    });

    return (
      <Tab.Group {...props}>
        <Tab active>Test</Tab>
        <Tab>Test</Tab>
        <Tab>Test</Tab>
        <Tab>Test</Tab>
      </Tab.Group>
    );
  });
