import { makeContextFactory } from "@/__tests__/helpers";
import { initialState } from "../modal-context";

export const contextFactory = makeContextFactory(initialState);
