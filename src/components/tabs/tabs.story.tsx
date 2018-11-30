import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Tabs } from "@/components/tabs";
import { TabsProps } from "@/components/tabs/tabs";

// https://github.com/storybooks/storybook/issues/4865
const alignSelectOptions = ({
  Default: null,
  centered: "centered",
  right: "right",
} as unknown) as { [k: string]: string };

const makeAlignSelect = () => select("Align", alignSelectOptions, "Default");

storiesOf("Tabs", module)
  .addDecorator(story => <div style={{ margin: 10 }}>{story()}</div>)
  .add("Default", () => (
    <Tabs
      type={select(
        "Tab type",
        {
          boxed: "boxed",
          toggle: "toggle",
          "toggle-rounded": "toggle-rounded",
        },
        "boxed",
      )}
      fullwidth={boolean("Full width", false)}
      align={makeAlignSelect() as TabsProps["align"]}
    >
      <Tabs.Tab active>Test</Tabs.Tab>
      <Tabs.Tab>Test</Tabs.Tab>
      <Tabs.Tab>Test</Tabs.Tab>
      <Tabs.Tab>Test</Tabs.Tab>
    </Tabs>
  ));
