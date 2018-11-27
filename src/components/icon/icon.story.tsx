import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "@/components/icon";

storiesOf("Icon", module)
  .add("Default", () => (
    <div>
      <Icon icon="bars" color="info" />
      <Icon icon="angle-down" />
    </div>
  ))
  .add("Custom Icon", () => (
    <div>
      <Icon>
        <span className="rbx rbx-bars" />
      </Icon>
    </div>
  ));
