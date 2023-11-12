"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
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
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema: z.ZodObject<
  { name: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { name: string },
  { name: string }
> = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingsFormProps): ReactElement {
  const params = useParams();
  const router: AppRouterInstance = useRouter();
  const origin: string = useOrigin();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form: UseFormReturn<{ name: string }, any, undefined> =
    useForm<SettingsFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData,
    });

  const onSubmit: (data: SettingsFormValues) => Promise<void> = async (
    data: SettingsFormValues
  ): Promise<void> => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete: () => Promise<void> = async (): Promise<void> => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
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
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={(): void => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
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
                      placeholder="Store name"
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
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      />
    </>
  );
}
