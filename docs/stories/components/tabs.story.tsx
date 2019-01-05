import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Tabs } from "src/components";
import {
  TABS_ALIGNMENTS,
  TABS_SIZES,
  TABS_TYPES,
} from "src/components/tabs/tabs";
import { Section } from "src/layout";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  align: (title: string = "Align") =>
    select(
      title,
      iterableToSelectObject(TABS_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  fullwidth: (title: string = "Fullwidth") => boolean(title, false),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(TABS_SIZES, { undefined: "" }), ""),
  type: (title: string = "Type") =>
    select(title, iterableToSelectObject(TABS_TYPES, { undefined: "" }), ""),
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
      <Tabs {...props}>
        <Tabs.Tab active>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
      </Tabs>
    );
  });
