"use client";

import { useEffect } from "react";

import { useStoreModal, useStoreModalStore } from "@/hooks/use-store-modal";

function SetupPage(): null {
  const onOpen: () => void = useStoreModal(
    (state: useStoreModalStore): (() => void) => state.onOpen
  );
  const isOpen: boolean = useStoreModal(
    (state: useStoreModalStore): boolean => state.isOpen
  );

  useEffect((): void => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}

export default SetupPage;
