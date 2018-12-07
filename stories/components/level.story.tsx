import { storiesOf } from "@storybook/react";
import React from "react";

import { Level } from "@/components";
import { Button, Control, Field, Heading, Input, Title } from "@/elements";
import { Section } from "@/layout";

import { knobs as modifierKnobs } from "../modifiers";

storiesOf("Components/Level", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const breakpoint = modifierKnobs.breakpoint();
    return (
      <Level breakpoint={breakpoint || undefined}>
        <Level.Side align="left">
          <Level.Item>
            <Title<"p"> as="p" size={5} subtitle>
              <strong>123</strong> posts
            </Title>
          </Level.Item>
          <Level.Item>
            <Field kind="addons">
              <Control>
                <Input placeholder="Find a post" />
              </Control>
              <Control>
                <Button<"button"> as="button">Search</Button>
              </Control>
            </Field>
          </Level.Item>
        </Level.Side>

        <Level.Side align="right">
          <Level.Item>
            <strong>All</strong>
          </Level.Item>
          <Level.Item>
            <a>Published</a>
          </Level.Item>
          <Level.Item>
            <a>Drafts</a>
          </Level.Item>
          <Level.Item>
            <a>Deleted</a>
          </Level.Item>
          <Level.Item>
            <Button color="success">New</Button>
          </Level.Item>
        </Level.Side>
      </Level>
    );
  })
  .add("Centered", () => (
    <Level>
      <Level.Item textAlignment="centered">
        <div>
          <Heading>Tweets</Heading>
          <Title<"p"> as="p">3,210</Title>
        </div>
      </Level.Item>
      <Level.Item textAlignment="centered">
        <div>
          <Heading>Following</Heading>
          <Title<"p"> as="p">210</Title>
        </div>
      </Level.Item>
      <Level.Item textAlignment="centered">
        <div>
          <Heading>Followers</Heading>
          <Title<"p"> as="p">321</Title>
        </div>
      </Level.Item>
      <Level.Item textAlignment="centered">
        <div>
          <Heading>Likes</Heading>
          <Title<"p"> as="p">321K</Title>
        </div>
      </Level.Item>
    </Level>
  ))
  .add("Centered (2)", () => (
    <Level>
      <Level.Item<"p"> as="p" textAlignment="centered">
        <a className="link is-info">Home</a>
      </Level.Item>
      <Level.Item<"p"> as="p" textAlignment="centered">
        <a className="link is-info">Menu</a>
      </Level.Item>
      <Level.Item<"p"> as="p" textAlignment="centered">
        <img
          src="https://bulma.io/images/bulma-type.png"
          alt=""
          style={{ height: "30px" }}
        />
      </Level.Item>
      <Level.Item<"p"> as="p" textAlignment="centered">
        <a className="link is-info">Reservations</a>
      </Level.Item>
      <Level.Item<"p"> as="p" textAlignment="centered">
        <a className="link is-info">Contact</a>
      </Level.Item>
    </Level>
  ));
