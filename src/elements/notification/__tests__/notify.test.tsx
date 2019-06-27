import {
  NOTIFICATION_TOAST_DEFAULTS,
  NotificationToastVariables,
} from "../notification-toast";
import { notify } from "../notify";

jest.useFakeTimers();

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
    (position: NotificationToastVariables["positions"]): void => {
      it(`Should display two toast notifications in "${position}" container`, () => {
        notify(`${position} 1`, position);
        notify(`${position} 2`, position);

        const container: HTMLElement | null = document.getElementById(
          `rbx-notification-toast-container-${position}`,
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
      });
    },
  );
});
