import { select } from "@storybook/addon-knobs";
import React from "react";

import { storiesOf } from "@storybook/react";

import { Image } from "@/elements";
import { IMAGE_SIZES, ImageSizes } from "@/elements/image/image";

import { Section } from "@/layout";
import { iterableToSelectObject } from "../helpers";

export const knobs = {
  fixedSize: (title: string = "Fixed size") =>
    select(
      title,
      iterableToSelectObject(IMAGE_SIZES, { undefined: "" }),
      "128",
    ),
  responsiveSize: (title: string = "Responsive size") =>
    select(
      title,
      iterableToSelectObject(IMAGE_SIZES, { undefined: "" }),
      "square",
    ),
};

storiesOf("Elements/Image", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => (
    <Image src="http://bulma.io/images/placeholders/128x128.png" size={128} />
  ))
  .add("Fixed square", () => {
    const size = knobs.fixedSize();
    return (
      <Image
        src={`https://bulma.io/images/placeholders/${size}x${size}.png`}
        size={parseInt(size, 10) as ImageSizes}
      />
    );
  })
  .add("Rounded images", () => (
    <Image
      size={128}
      rounded
      src="https://bulma.io/images/placeholders/128x128.png"
    />
  ))
  .add("Retina images", () => (
    <Image size={128} src="https://bulma.io/images/placeholders/256x256.png" />
  ))
  .add("Responsive images with ratios", () => {
    const size = knobs.responsiveSize();
    const sizeMap = {
      "16by9": "640x360",
      "1by1": "480x480",
      "1by2": "320x640",
      "1by3": "240x720",
      "2by1": "640x320",
      "2by3": "320x480",
      "3by1": "720x240",
      "3by2": "480x320",
      "3by4": "480x640",
      "3by5": "480x800",
      "4by3": "640x480",
      "4by5": "480x600",
      "5by3": "800x480",
      "5by4": "600x480",
      "9by16": "360x640",
      square: "480x480",
    };

    return (
      <div style={{ height: "300px", width: "300px" }}>
        <Image
          src={`https://bulma.io/images/placeholders/${sizeMap[size]}.png`}
          size={size}
        />
      </div>
    );
  });
