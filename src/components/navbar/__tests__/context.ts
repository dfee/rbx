import { initialState as navbarContextInitialState } from "../navbar-context";
import { initialState as navbarItemContextInitialState } from "../navbar-item-context";

import { makeContextFactory } from "@/__tests__/testing";

export const navbarContextFactory = makeContextFactory(
  navbarContextInitialState,
);

export const navbarItemContextFactory = makeContextFactory(
  navbarItemContextInitialState,
);
