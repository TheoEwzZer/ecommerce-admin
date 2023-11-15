"use client";

import { ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema: z.ZodObject<
  { name: z.ZodString; billboardId: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { name: string; billboardId: string },
  { name: string; billboardId: string }
> = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export function CategoryForm({
  initialData,
  billboards,
}: CategoryFormProps): ReactElement {
  const params = useParams();
  const router: AppRouterInstance = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title: "Edit category" | "Create category" = initialData
    ? "Edit category"
    : "Create category";
  const description: "Edit a category." | "Add a new category" = initialData
    ? "Edit a category."
    : "Add a new category";
  const toastMessage: "Category updated." | "Category created." = initialData
    ? "Category updated."
    : "Category created.";
  const action: "Save changes" | "Create" = initialData ? "Save changes" : "Create";

  const form: UseFormReturn<{ name: string; billboardId: string }, any, undefined> =
    useForm<CategoryFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
        name: "",
        billboardId: "",
      },
    });

  const onSubmit: (data: CategoryFormValues) => Promise<void> = async (
    data: CategoryFormValues
  ): Promise<void> => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this category first.");
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
                  { name: string; billboardId: string },
                  "name"
                >;
                fieldState: ControllerFieldState;
                formState: UseFormStateReturn<{ name: string; billboardId: string }>;
              }): ReactElement => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  { name: string; billboardId: string },
                  "billboardId"
                >;
                fieldState: ControllerFieldState;
                formState: UseFormStateReturn<{
                  name: string;
                  billboardId: string;
                }>;
              }): ReactElement => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map(
                        (billboard: Billboard): ReactElement => (
                          <SelectItem
                            key={billboard.id}
                            value={billboard.id}
                          >
                            {billboard.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
