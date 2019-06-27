import { shallow } from "enzyme";
import * as React from "react";

import { NotificationToast } from "../notification-toast";

jest.useFakeTimers();

describe(`NotificationToast`, () => {
  it("Should mount one default notification", () => {
    const wrapper = shallow(
      <NotificationToast>Test notification toast</NotificationToast>,
    );
    let render = wrapper.render();

    // Color
    expect(render.hasClass("is-info")).toBeTruthy();

    // Delete
    expect(render.find(".delete").is("button")).toBeTruthy();

    // Progress bar
    expect(render.find(".progress").hasClass("is-info")).toBeTruthy();
    expect(render.find(".progress").is("progress")).toBeTruthy();
    expect(render.find(".progress").prop("value")).toEqual("100");

    // Check progress bar value after timer execution
    jest.runAllTimers();
    render = wrapper.render();
    expect(render.find(".progress").prop("value")).toEqual("0");
  });

  it("Should mount one danger notification", () => {
    const wrapper = shallow(
      <NotificationToast color="danger">
        Test notification toast
      </NotificationToast>,
    );
    const render = wrapper.render();

    // Color
    expect(render.hasClass("is-danger")).toBeTruthy();

    // Delete
    expect(render.find(".delete").is("button")).toBeTruthy();

    // Progress bar
    expect(render.find(".progress").hasClass("is-danger")).toBeTruthy();
    expect(render.find(".progress").is("progress")).toBeTruthy();

    jest.runAllTimers();
  });

  it("Should mount one notification without progress and delete", () => {
    const wrapper = shallow(
      <NotificationToast close={false} progress={false}>
        Test notification toast
      </NotificationToast>,
    );
    const render = wrapper.render();

    // Color
    expect(render.hasClass("is-info")).toBeTruthy();

    // Delete
    expect(render.find(".delete").length).toBeFalsy();

    // Progress bar
    expect(render.find(".progress").length).toBeFalsy();

    jest.runAllTimers();
  });

  it("Should call onClose callback", () => {
    const onCloseMock = jest.fn();
    shallow(
      <NotificationToast onClose={onCloseMock}>
        Test notification toast
      </NotificationToast>,
    );
    expect(onCloseMock.mock.calls.length).toEqual(0);

    jest.runAllTimers();
    expect(onCloseMock.mock.calls.length).toEqual(1);
  });

  it("Should pause on mouse hover, should resume on mouse leave", () => {
    const wrapper = shallow<NotificationToast>(
      <NotificationToast>Test notification toast</NotificationToast>,
    );
    let render = wrapper.render();

    expect(render.find(".progress").prop("value")).toEqual("100");

    wrapper.simulate("mouseEnter");
    jest.runAllTimers();
    render = wrapper.render();
    expect(render.find(".progress").prop("value")).toEqual("100");

    wrapper.simulate("mouseLeave");
    jest.runAllTimers();
    render = wrapper.render();
    expect(render.find(".progress").prop("value")).toEqual("0");
  });

  it("Should close on click", () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <NotificationToast onClose={onCloseMock}>
        Test notification toast
      </NotificationToast>,
    );
    expect(onCloseMock.mock.calls.length).toEqual(0);

    // Click on notification
    wrapper.simulate("click");
    expect(onCloseMock.mock.calls.length).toEqual(1);
  });

  it("Should not close on click", () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <NotificationToast closeOnClick={false} onClose={onCloseMock}>
        Test notification toast
      </NotificationToast>,
    );
    expect(onCloseMock.mock.calls.length).toEqual(0);

    // Click on notification
    wrapper.simulate("click");
    expect(onCloseMock.mock.calls.length).toEqual(0);
  });
});
