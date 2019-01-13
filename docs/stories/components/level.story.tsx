import { storiesOf } from "@storybook/react";
import React from "react";

import { Level } from "src/components";
import { Button, Control, Field, Heading, Input, Title } from "src/elements";
import { Section } from "src/layout";

import { breakpointKnob } from "docs/stories/common";
import { filterUndefined } from "docs/stories/utils";

storiesOf("Components/Level", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      breakpoint: breakpointKnob(),
    });

    return (
      <Level {...props}>
        <Level.Item align="left">
          <Level.Item>
            <Title as="p" size={5} subtitle>
              <strong>123</strong> posts
            </Title>
          </Level.Item>
          <Level.Item>
            <Field kind="addons">
              <Control>
                <Input placeholder="Find a post" />
              </Control>
              <Control>
                <Button as="button">Search</Button>
              </Control>
            </Field>
          </Level.Item>
        </Level.Item>

        <Level.Item align="right">
          <Level.Item>
            <strong>All</strong>
          </Level.Item>
          <Level.Item>
            <a href="#published">Published</a>
          </Level.Item>
          <Level.Item>
            <a href="#drafts">Drafts</a>
          </Level.Item>
          <Level.Item>
            <a href="#deleted">Deleted</a>
          </Level.Item>
          <Level.Item>
            <Button color="success">New</Button>
          </Level.Item>
        </Level.Item>
      </Level>
    );
  })
  .add("Centered", () => (
    <Level>
      <Level.Item textAlign="centered">
        <div>
          <Heading>Tweets</Heading>
          <Title as="p">3,210</Title>
        </div>
      </Level.Item>
      <Level.Item textAlign="centered">
        <div>
          <Heading>Following</Heading>
          <Title as="p">210</Title>
        </div>
      </Level.Item>
      <Level.Item textAlign="centered">
        <div>
          <Heading>Followers</Heading>
          <Title as="p">321</Title>
        </div>
      </Level.Item>
      <Level.Item textAlign="centered">
        <div>
          <Heading>Likes</Heading>
          <Title as="p">321K</Title>
        </div>
      </Level.Item>
    </Level>
  ))
  .add("Centered (2)", () => (
    <Level>
      <Level.Item as="p" textAlign="centered">
        <a className="link is-info" href="#home">
          Home
        </a>
      </Level.Item>
      <Level.Item as="p" textAlign="centered">
        <a className="link is-info" href="#menu">
          Menu
        </a>
      </Level.Item>
      <Level.Item as="p" textAlign="centered">
        <img
          src="https://bulma.io/images/bulma-type.png"
          alt=""
          role="presentation"
          style={{ height: "30px" }}
        />
      </Level.Item>
      <Level.Item as="p" textAlign="centered">
        <a className="link is-info" href="#reservations">
          Reservations
        </a>
      </Level.Item>
      <Level.Item as="p" textAlign="centered">
        <a className="link is-info" href="#contact">
          Contact
        </a>
      </Level.Item>
    </Level>
  ));
