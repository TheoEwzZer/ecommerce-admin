"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useStoreModal, useStoreModalStore } from "@/hooks/use-store-modal";

const formSchema: z.ZodObject<
  { name: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { name: string },
  { name: string }
> = z.object({
  name: z.string().min(1),
});

export function StoreModal(): ReactElement {
  const StoreModal: useStoreModalStore = useStoreModal();

  const [loading, setLoading] = useState<boolean>(false);

  const form: UseFormReturn<{ name: string }, any, undefined> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: (values: z.infer<typeof formSchema>) => Promise<void> = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    try {
      setLoading(true);

      const response: AxiosResponse<any, any> = await axios.post("/api/stores", values);

      toast.success("Store created.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<{ name: string }, "name">;
                  fieldState: ControllerFieldState;
                  formState: UseFormStateReturn<{ name: string }>;
                }): ReactElement => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={StoreModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
