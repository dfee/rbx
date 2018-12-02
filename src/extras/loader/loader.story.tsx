import React from "react";

import { storiesOf } from "@storybook/react";

import { Loader } from "@/extras";
import "./loader.story.sass";

storiesOf("Extras/Loader", module)
  .add("Default", () => <Loader />)
  .add("with inline style", () => (
    <Loader
      style={{
        border: "4px solid blue",
        borderRightColor: "transparent",
        borderTopColor: "transparent",
        height: 300,
        width: 300,
      }}
    />
  ))
  .add("with other classes", () => <Loader className="loader-override" />);
