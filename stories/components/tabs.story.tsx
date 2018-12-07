import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Tabs } from "@/components";
import {
  TABS_ALIGNMENTS,
  TABS_SIZES,
  TABS_TYPES,
} from "@/components/tabs/tabs";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../helpers";

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
    const align = knobs.align();
    const fullwidth = knobs.fullwidth();
    const size = knobs.size();
    const type = knobs.type();
    return (
      <Tabs
        align={align || undefined}
        fullwidth={fullwidth}
        size={size || undefined}
        type={type || undefined}
      >
        <Tabs.Tab active>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
        <Tabs.Tab>Test</Tabs.Tab>
      </Tabs>
    );
  });
