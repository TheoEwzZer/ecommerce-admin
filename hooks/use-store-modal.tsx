import { StoreApi, UseBoundStore, create } from "zustand";

export interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal: UseBoundStore<StoreApi<useStoreModalStore>> =
  create<useStoreModalStore>(
    (set: any): useStoreModalStore => ({
      isOpen: false,
      onOpen: (): void => set({ isOpen: true }),
      onClose: (): void => set({ isOpen: false }),
    })
  );
