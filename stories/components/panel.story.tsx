import {
  faBook,
  faCodeBranch,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Panel } from "@/components";
import { Button, Checkbox, Control, Icon, Input } from "@/elements";
import { Columns } from "@/grid";
import { Section } from "@/layout";

storiesOf("Components/Panel", module)
  .addDecorator(story => (
    <Section>
      <Columns>
        <Columns.Column
          mobile={{ size: "full" }}
          tablet={{ size: "half" }}
          desktop={{ size: "one-third" }}
          widescreen={{ size: "one-quarter" }}
          fullhd={{ size: "one-fifth" }}
        >
          {story()}
        </Columns.Column>
      </Columns>
    </Section>
  ))
  .add("Default", () => (
    <Panel>
      <Panel.Heading>repositories</Panel.Heading>
      <Panel.Block>
        <Control iconLeft>
          <Input size="small" type="text" placeholder="search" />
          <Icon size="small" className="is-left">
            <FontAwesomeIcon icon={faSearch} />
          </Icon>
        </Control>
      </Panel.Block>
      <Panel.Tabs className="panel-tabs">
        <Panel.Tabs.Tab active>all</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>public</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>private</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>sources</Panel.Tabs.Tab>
        <Panel.Tabs.Tab>forks</Panel.Tabs.Tab>
      </Panel.Tabs>
      <Panel.Block as="a" active>
        <Panel.Icon>
          <FontAwesomeIcon icon={faBook} />
        </Panel.Icon>
        bulma
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon>
          <FontAwesomeIcon icon={faBook} />
        </Panel.Icon>
        marksheet
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon>
          <FontAwesomeIcon icon={faBook} />
        </Panel.Icon>
        minireset.css
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon>
          <FontAwesomeIcon icon={faBook} />
        </Panel.Icon>
        jgthms.github.io
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon>
          <FontAwesomeIcon icon={faCodeBranch} />
        </Panel.Icon>
        daniellowtw/infboard
      </Panel.Block>
      <Panel.Block>
        <Panel.Icon>
          <FontAwesomeIcon icon={faCodeBranch} />
        </Panel.Icon>
        mojs
      </Panel.Block>

      <Panel.Block as="label" className="panel-block">
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
