"use client";

import { ComponentPropsWithoutRef, ReactElement, useState } from "react";

import { Store } from "@prisma/client";

import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal, useStoreModalStore } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Store as Item } from "@prisma/client";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

interface FormatItem {
  label: string;
  value: string;
}

function StoreSwitcher({ className, items = [] }: StoreSwitcherProps): ReactElement {
  const storeModal: useStoreModalStore = useStoreModal();
  const params = useParams();
  const router: AppRouterInstance = useRouter();

  const formattedItems: FormatItem[] = items.map(
    (item: Item): FormatItem => ({
      label: item.name,
      value: item.id,
    })
  );

  const currentStore: FormatItem | undefined = formattedItems.find(
    (item: FormatItem): boolean => item.value === params.storeId
  );

  const [open, setOpen] = useState<boolean>(false);

  const onStoreSelect: (store: FormatItem) => void = (store: FormatItem): void => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map(
                (store: FormatItem): ReactElement => (
                  <CommandItem
                    key={store.value}
                    onSelect={(): void => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={(): void => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StoreSwitcher;
