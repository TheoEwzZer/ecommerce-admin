"use client";

import { ReactElement, useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export function ModalProvider(): ReactElement | null {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}
