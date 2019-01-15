import {
  faBook,
  faCodeBranch,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Panel } from "src/components";
import { Button, Checkbox, Control, Icon, Input } from "src/elements";
import { Column } from "src/grid";
import { Section } from "src/layout";

storiesOf("Components/Panel", module)
  .addDecorator(story => (
    <Section>
      <Column.Group>
        <Column
          mobile={{ size: "full" }}
          tablet={{ size: "half" }}
          desktop={{ size: "one-third" }}
          widescreen={{ size: "one-quarter" }}
          fullhd={{ size: "one-fifth" }}
        >
          {story()}
        </Column>
      </Column.Group>
    </Section>
  ))
  .add("Default", () => (
    <Panel>
      <Panel.Heading>repositories</Panel.Heading>
      <Panel.Block>
        <Control iconLeft>
          <Input size="small" type="text" placeholder="search" />
          <Icon size="small" align="left">
            <FontAwesomeIcon icon={faSearch} />
          </Icon>
        </Control>
      </Panel.Block>
      <Panel.Tab.Group>
        <Panel.Tab active>all</Panel.Tab>
        <Panel.Tab>public</Panel.Tab>
        <Panel.Tab>private</Panel.Tab>
        <Panel.Tab>sources</Panel.Tab>
        <Panel.Tab>forks</Panel.Tab>
      </Panel.Tab.Group>
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

      <Panel.Block as="label">
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
