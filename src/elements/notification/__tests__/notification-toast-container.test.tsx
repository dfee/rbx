import { mount } from "enzyme";
import * as React from "react";

import { NotificationToastContainer } from "../notification-toast-container";

describe(`NotificationToastContainer`, () => {
  it("Should mount an empty notification toast container", () => {
    const wrapper = mount<NotificationToastContainer>(
      <NotificationToastContainer id="test-id" position="center" />,
    );
    const render = wrapper.render();

    // Check container is empty
    expect(render.find(".notification").length).toBeFalsy();

    wrapper.unmount();
  });
});
