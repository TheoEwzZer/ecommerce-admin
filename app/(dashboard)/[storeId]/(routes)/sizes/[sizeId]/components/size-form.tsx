"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const formSchema: z.ZodObject<
  { name: z.ZodString; value: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { name: string; value: string },
  { name: string; value: string }
> = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

export function SizeForm({ initialData }: SizeFormProps): ReactElement {
  const params = useParams();
  const router: AppRouterInstance = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title: "Edit size" | "Create size" = initialData ? "Edit size" : "Create size";
  const description: "Edit a size." | "Add a new size" = initialData
    ? "Edit a size."
    : "Add a new size";
  const toastMessage: "Size updated." | "Size created." = initialData
    ? "Size updated."
    : "Size created.";
  const action: "Save changes" | "Create" = initialData ? "Save changes" : "Create";

  const form: UseFormReturn<{ name: string; value: string }, any, undefined> =
    useForm<SizeFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
        name: "",
        value: "",
      },
    });

  const onSubmit: (data: SizeFormValues) => Promise<void> = async (
    data: SizeFormValues
  ): Promise<void> => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete: () => Promise<void> = async (): Promise<void> => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={(): void => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={(): void => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  {
                    name: string;
                    value: string;
                  },
                  "name"
                >;
                fieldState: ControllerFieldState;
                formState: UseFormStateReturn<{
                  name: string;
                  value: string;
                }>;
              }): ReactElement => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  {
                    name: string;
                    value: string;
                  },
                  "value"
                >;
                fieldState: ControllerFieldState;
                formState: UseFormStateReturn<{
                  name: string;
                  value: string;
                }>;
              }): ReactElement => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
