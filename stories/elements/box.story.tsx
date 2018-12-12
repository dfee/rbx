import { faHeart, faReply, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Level, Media } from "@/components";
import { Box, Content, Icon, Image } from "@/elements";
import { Section } from "@/layout";

export const knobs = {
  paddingless: (title: string = "Paddingless") => boolean(title, false),
};

storiesOf("Elements/Box", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = { paddingless: knobs.paddingless() };
    return (
      <Box {...props}>
        <Media>
          <Media.Item position="left">
            <Image.Container size={64}>
              <Image
                alt="Image"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </Image.Container>
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </Content>
            <Level breakpoint="mobile">
              <Level.Left>
                <Level.Item as="a" aria-label="reply">
                  <Icon size="small">
                    <FontAwesomeIcon icon={faReply} />
                  </Icon>
                </Level.Item>
                <Level.Item as="a" aria-label="retweet">
                  <Icon size="small">
                    <FontAwesomeIcon icon={faRetweet} />
                  </Icon>
                </Level.Item>
                <Level.Item as="a" aria-label="like">
                  <Icon size="small">
                    <FontAwesomeIcon icon={faHeart} />
                  </Icon>
                </Level.Item>
              </Level.Left>
            </Level>
          </Media.Item>
        </Media>
      </Box>
    );
  });
