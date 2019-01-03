import { ModalCard } from "src/components/modal/modal-card";
import { ModalCardBody } from "src/components/modal/modal-card-body";
import { ModalCardFoot } from "src/components/modal/modal-card-foot";
import { ModalCardHead } from "src/components/modal/modal-card-head";
import { ModalCardTitle } from "src/components/modal/modal-card-title";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = ModalCard;
const COMPONENT_NAME = "ModalCard";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal-card";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);
});
