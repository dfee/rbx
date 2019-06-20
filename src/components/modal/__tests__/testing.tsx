import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContext,
} from "src/base/theme";
import {
  ModalContext,
  ModalContextValue,
  initialValue as modalInitialValue,
} from "src/components/modal/modal-context";
import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  MakeReactWrapperFunction,
  MakeShallowWrapperFunction,
} from "src/__tests__/testing";

export const getInnerShallowWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // ContextProvider
    .dive() // Component
    .dive() // Generic
    .dive(); // Leaf ("as")

export const makeShallowWrapperFactory = (
  // todo: rename getInnerWrapper => getInnerShallowWrapper
  getInnerWrapper: GetInnerShallowWrapperFunction = getInnerShallowWrapper,
  modalContextValue: ModalContextValue = modalInitialValue,
): MakeShallowWrapperFunction => ({
  node,
  contextValue = themeInitialValue,
}) => {
  const wrapper = Enzyme.shallow(
    <ThemeContext.Provider value={contextValue}>
      <ModalContext.Provider value={modalContextValue}>
        {node}
      </ModalContext.Provider>
    </ThemeContext.Provider>,
  );
  return getInnerWrapper(wrapper);
};

export const getInnerReactWrapper: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children() // Generic
    .children(); // Leaf ("as")

export const makeReactWrapperFactory = (
  // todo: rename getInnerWrapper => getInnerReactWrapper
  getInnerWrapper: GetInnerReactWrapperFunction = getInnerReactWrapper,
  modalContextValue: ModalContextValue = modalInitialValue,
): MakeReactWrapperFunction => ({ node, contextValue = themeInitialValue }) =>
  getInnerWrapper(
    Enzyme.mount(
      <ThemeContext.Provider value={contextValue}>
        <ModalContext.Provider value={modalContextValue}>
          {node}
        </ModalContext.Provider>
      </ThemeContext.Provider>,
    ),
  );
