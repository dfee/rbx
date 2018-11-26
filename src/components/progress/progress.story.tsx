import { storiesOf } from "@storybook/react";
import React from "react";

import Progress from "components/progress";

storiesOf("Progress", module).add("Default", () => (
  <div>
    <Progress max={100} value={15} color="primary" size="small" />
    <Progress max={100} value={15} color="info" />
    <Progress max={100} value={15} color="success" size="medium" />
    {/* todo */}
    <Progress max={100} value={15} color={"error" as "black"} size="large" />
  </div>
));
