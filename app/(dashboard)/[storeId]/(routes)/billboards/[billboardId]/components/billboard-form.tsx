"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
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
import { useOrigin } from "@/hooks/use-origin";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ImageUpload from "@/components/ui/image-upload";

const formSchema: z.ZodObject<
  { label: z.ZodString; imageUrl: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { label: string; imageUrl: string },
  { label: string; imageUrl: string }
> = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1).url(),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export function BillboardForm({ initialData }: BillboardFormProps): ReactElement {
  const params = useParams();
  const router: AppRouterInstance = useRouter();
  const origin: string = useOrigin();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title: "Edit billboard" | "Create billboard" = initialData
    ? "Edit billboard"
    : "Create billboard";
  const description: "Edit a billboard." | "Add a new billboard" = initialData
    ? "Edit a billboard."
    : "Add a new billboard";
  const toastMessage: "Billboard updated." | "Billboard created." = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action: "Save changes" | "Create" = initialData ? "Save changes" : "Create";

  const form: UseFormReturn<{ label: string; imageUrl: string }, any, undefined> =
    useForm<BillboardFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
        label: "",
        imageUrl: "",
      },
    });

  const onSubmit: (data: BillboardFormValues) => Promise<void> = async (
    data: BillboardFormValues
  ): Promise<void> => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all categories using this billboard first.");
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
            size="sm"
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                { label: string; imageUrl: string },
                "imageUrl"
              >;
              fieldState: ControllerFieldState;
              formState: UseFormStateReturn<{
                label: string;
                imageUrl: string;
              }>;
            }): ReactElement => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url: string): void => field.onChange(url)}
                    onRemove={(): void => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  {
                    label: string;
                    imageUrl: string;
                  },
                  "label"
                >;
                fieldState: ControllerFieldState;
                formState: UseFormStateReturn<{
                  label: string;
                  imageUrl: string;
                }>;
              }): ReactElement => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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
