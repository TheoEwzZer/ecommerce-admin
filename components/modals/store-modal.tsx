"use client";

import { ReactElement } from "react";

import { useStoreModal, useStoreModalStore } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";

export function StoreModal(): ReactElement {
  const StoreModal: useStoreModalStore = useStoreModal();

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
}
