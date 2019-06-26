import { notify, NotificationToast } from "../notification-toast";
import { shallow } from "enzyme";
import React from "react";
import {
  NOTIFICATION_TOAST_DEFAULTS,
  NotificationToastVariables,
} from "../notification-toast-container";

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
      <NotificationToast progress={false} delete={false}>
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
      <NotificationToast onClose={onCloseMock} closeOnClick={false}>
        Test notification toast
      </NotificationToast>,
    );
    expect(onCloseMock.mock.calls.length).toEqual(0);

    // Click on notification
    wrapper.simulate("click");
    expect(onCloseMock.mock.calls.length).toEqual(0);
  });
});

describe(`notify`, () => {
  it("Should display a custom toast notification", () => {
    notify({
      children: "custom toast notification",
      color: "danger",
    });

    const container: HTMLElement | null = document.getElementById(
      "rbx-notification-toast-container-top-right",
    );
    expect(container).toBeInstanceOf(HTMLDivElement);
    if (!container) {
      return;
    }
    expect(container.children).toHaveLength(1);
    const notificationToast = container.children[0];
    expect(notificationToast).toBeInstanceOf(HTMLDivElement);
    expect(notificationToast.className).toEqual("notification is-danger");
    expect(notificationToast.textContent).toEqual("custom toast notification");

    jest.runAllTimers();
    expect(container.children).toHaveLength(0);
  });

  NOTIFICATION_TOAST_DEFAULTS.positions.map(
    async (position: NotificationToastVariables["positions"]) => {
      it(
        'Should display two toast notifications in "' +
          position +
          '" container',
        () => {
          notify(position + " 1", position);
          notify(position + " 2", position);

          const container: HTMLElement | null = document.getElementById(
            "rbx-notification-toast-container-" + position,
          );
          expect(container).toBeInstanceOf(HTMLDivElement);
          if (!container) {
            return;
          }
          expect(container.children).toHaveLength(2);
          const notificationToast = container.children[0];
          expect(notificationToast).toBeInstanceOf(HTMLDivElement);
          expect(notificationToast.className).toEqual("notification is-info");

          jest.runAllTimers();
          expect(container.children).toHaveLength(0);
        },
      );
    },
  );
});
