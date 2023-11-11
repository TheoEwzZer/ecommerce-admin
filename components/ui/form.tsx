import {
  ComponentPropsWithoutRef,
  Context,
  ElementRef,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  RefAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form: <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>
) => ReactElement = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext: Context<FormFieldContextValue<FieldValues, string>> =
  createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField: <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => ReactElement = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>): ReactElement => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField: () => {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError | undefined;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
} = (): {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError | undefined;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
} => {
  const fieldContext: FormFieldContextValue<FieldValues, string> =
    useContext(FormFieldContext);
  const itemContext: FormItemContextValue = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState: {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    error?: FieldError | undefined;
  } = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext: Context<FormItemContextValue> =
  createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem: ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const id: string = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

const FormLabel: ForwardRefExoticComponent<
  Omit<LabelPrimitive.LabelProps & RefAttributes<HTMLLabelElement>, "ref"> &
    RefAttributes<HTMLLabelElement>
> = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(
  (
    {
      className,
      ...props
    }: Omit<LabelPrimitive.LabelProps & RefAttributes<HTMLLabelElement>, "ref">,
    ref: ForwardedRef<HTMLLabelElement>
  ): ReactElement => {
    const { error, formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        className={cn(error && "text-destructive", className)}
        htmlFor={formItemId}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

const FormControl: ForwardRefExoticComponent<
  Omit<SlotProps & RefAttributes<HTMLElement>, "ref"> & RefAttributes<HTMLElement>
> = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
  (
    { ...props }: Omit<SlotProps & RefAttributes<HTMLElement>, "ref">,
    ref: ForwardedRef<HTMLElement>
  ): ReactElement => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);

FormControl.displayName = "FormControl";

const FormDescription: ForwardRefExoticComponent<
  HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
> = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLParagraphElement>,
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);

FormDescription.displayName = "FormDescription";

const FormMessage: ForwardRefExoticComponent<
  HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
> = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  (
    { className, children, ...props }: HTMLAttributes<HTMLParagraphElement>,
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement | null => {
    const { error, formMessageId } = useFormField();
    const body: ReactNode = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
