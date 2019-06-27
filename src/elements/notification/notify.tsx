import React, { ReactChild } from "react";
import { render } from "react-dom";

import {
  NotificationToastProps,
  NotificationToastVariables,
} from "./notification-toast";
import { NotificationToastContainer } from "./notification-toast-container";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotificationToastProps = (arg: any): arg is NotificationToastProps => {
  return arg.children !== undefined;
};

export const notify = (
  props: Partial<NotificationToastProps> | ReactChild | string,
  position: NotificationToastVariables["positions"] = "top-right",
): void => {
  const notifyContainerId = `rbx-notification-toast-container-${position}`;
  let notifyContainer = document.getElementById(notifyContainerId);

  if (!notifyContainer) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const notificationToastContainer: JSX.Element = (
      <NotificationToastContainer id={notifyContainerId} position={position} />
    );

    render(notificationToastContainer, container);
    notifyContainer = document.getElementById(
      notifyContainerId,
    ) as HTMLDivElement;
  }

  let finalProps: Partial<NotificationToastProps>;
  if (isNotificationToastProps(props)) {
    finalProps = props;
  } else {
    const children: ReactChild | string = props as ReactChild | string;
    finalProps = { children };
  }
  notifyContainer.dispatchEvent(
    new CustomEvent("notify", { detail: finalProps }),
  );
};
