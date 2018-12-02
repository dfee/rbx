import React from "react";

import { storiesOf } from "@storybook/react";

import { Box, Button, Title } from "@/elements";
import { Control, Field, Input } from "@/form";
import { Container, Hero, Level, Section } from "@/layout";

const style: React.CSSProperties = { textAlign: "center" };

storiesOf("Layout/Level", module)
  .addDecorator(story => (
    <Hero size="fullheight">
      <Hero.Head<"header"> as="header">
        <Container>{story()}</Container>
      </Hero.Head>
    </Hero>
  ))
  .add("Default", () => (
    <Section>
      <Box>
        <Level<"nav"> as="nav">
          <Level.Side align="left">
            <Level.Item>
              <Title size={5} subtitle>
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
              <Button<"a"> as="a" color="success">
                New
              </Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Box>
    </Section>
  ))
  .add("Items Centered", () => (
    <Section>
      <Box>
        <Level<"nav"> as="nav">
          <Level.Item style={style}>
            <div>
              <Title<"p"> as="p" heading>
                Tweets
              </Title>
              <Title<"p"> as="p" heading>
                3,210
              </Title>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Title<"p"> as="p" heading>
                Following
              </Title>
              <Title<"p"> as="p" heading>
                210
              </Title>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Title<"p"> as="p" heading>
                Followers
              </Title>
              <Title<"p"> as="p" heading>
                321
              </Title>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Title<"p"> as="p" heading>
                Likes
              </Title>
              <Title<"p"> as="p" heading>
                321K
              </Title>
            </div>
          </Level.Item>
        </Level>
      </Box>
    </Section>
  ))
  .add("With breakpoint", () =>
    ["Mobile", "Without breakpoint"].map(title => {
      const breakpoint = title === "Mobile" ? "mobile" : undefined;
      return (
        <Section key={title}>
          <Title>{title}</Title>
          <Box>
            <Level<"nav"> as="nav" breakpoint={breakpoint}>
              <Level.Item style={style}>
                <div>
                  <Title<"p"> as="p" heading>
                    Tweets
                  </Title>
                  <Title<"p"> as="p" heading>
                    3,210
                  </Title>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Title<"p"> as="p" heading>
                    Following
                  </Title>
                  <Title<"p"> as="p" heading>
                    210
                  </Title>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Title<"p"> as="p" heading>
                    Followers
                  </Title>
                  <Title<"p"> as="p" heading>
                    321
                  </Title>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Title<"p"> as="p" heading>
                    Likes
                  </Title>
                  <Title<"p"> as="p" heading>
                    321K
                  </Title>
                </div>
              </Level.Item>
            </Level>
          </Box>
        </Section>
      );
    }),
  );
