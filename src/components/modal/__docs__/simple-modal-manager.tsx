import React, { useState } from "react";

import { Button } from "src/elements/button";

import { Modal, ModalProps } from "../modal";

interface SimpleModalManagerProps {
  modalProps: Omit<ModalProps, "onClose" | "active">;
  children: React.ReactNode;
}

export const SimpleModalManager = ({
  modalProps,
  children,
}: SimpleModalManagerProps) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <Button onClick={() => setActive(true)}>Open modal</Button>
      <Modal active={active} onClose={() => setActive(false)} {...modalProps}>
        {children}
      </Modal>
    </div>
  );
};
