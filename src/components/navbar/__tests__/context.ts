import { initialState } from "../navbar-context";

import { makeContextFactory } from "@/__tests__/testing";

export const contextFactory = makeContextFactory(initialState);
