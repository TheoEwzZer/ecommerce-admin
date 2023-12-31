"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
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
  name: z.string().min(2),
  value: z
    .string()
    .min(4)
    .max(9)
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})([A-Fa-f0-9]{2})?$/, {
      message: "String must be a valid hex code",
    }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export function ColorForm({ initialData }: ColorFormProps): ReactElement {
  const params = useParams();
  const router: AppRouterInstance = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title: "Edit color" | "Create color" = initialData
    ? "Edit color"
    : "Create color";
  const description: "Edit a color." | "Add a new color" = initialData
    ? "Edit a color."
    : "Add a new color";
  const toastMessage: "Color updated." | "Color created." = initialData
    ? "Color updated."
    : "Color created.";
  const action: "Save changes" | "Create" = initialData ? "Save changes" : "Create";

  const form: UseFormReturn<{ name: string; value: string }, any, undefined> =
    useForm<ColorFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
        name: "",
        value: "",
      },
    });

  const onSubmit: (data: ColorFormValues) => Promise<void> = async (
    data: ColorFormValues
  ): Promise<void> => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this color first.");
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
                      placeholder="Color name"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
