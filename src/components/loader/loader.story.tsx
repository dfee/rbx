import React from "react";

import { storiesOf } from "@storybook/react";

import { Loader } from "@/components/loader";
import "./loader.story.sass";

storiesOf("Loader", module)
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
