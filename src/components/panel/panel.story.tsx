import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from "@/components/button";
import { Checkbox, Control, Input } from "@/components/form";
import { Icon } from "@/components/icon";
import { Panel } from "@/components/panel";

storiesOf("Panel", module)
  .addDecorator(story => <div style={{ margin: 10 }}>{story()}</div>)
  .add("Default", () => (
    <Panel>
      <Panel.Header>repositories</Panel.Header>
      <Panel.Block>
        <Control>
          <Input size="small" type="text" placeholder="search" />
        </Control>
      </Panel.Block>
      <Panel.Tabs className="panel-tabs">
        <Panel.Tabs.Tab active>all</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>public</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>private</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>sources</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>forks</Panel.Tabs.Tab>
      </Panel.Tabs>
      <Panel.Block<"a"> as="a" active>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        bulma
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        rbx
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        minireset.css
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        jgthms.github.io
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        dfee.github.io
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon<typeof Icon> as={Icon} icon="angle-down" />
        mojs
      </Panel.Block>
      <Panel.Block<"label"> as="label" className="panel-block">
        <Checkbox />
        remember me
      </Panel.Block>
      <Panel.Block>
        <Button fullwidth color="link" outlined>
          reset all filters
        </Button>
      </Panel.Block>
    </Panel>
  ));
