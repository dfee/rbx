import { ModalCard } from "../modal-card";
import { ModalCardBody } from "../modal-card-body";
import { ModalCardFoot } from "../modal-card-foot";
import { ModalCardHead } from "../modal-card-head";
import { ModalCardTitle } from "../modal-card-title";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

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
