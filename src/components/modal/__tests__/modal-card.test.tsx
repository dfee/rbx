import { ModalCard } from "src/components/modal/modal-card";
import { ModalCardBody } from "src/components/modal/modal-card-body";
import { ModalCardFoot } from "src/components/modal/modal-card-foot";
import { ModalCardHead } from "src/components/modal/modal-card-head";
import { ModalCardTitle } from "src/components/modal/modal-card-title";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = ModalCard;
const DISPLAY_NAME = "Modal.Card";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal-card";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
