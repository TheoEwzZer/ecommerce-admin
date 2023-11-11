"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefExoticComponent,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  forwardRef,
} from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ClassProp } from "class-variance-authority/types";

const labelVariants: (props?: ClassProp | undefined) => string = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label: ForwardRefExoticComponent<
  Omit<LabelPrimitive.LabelProps & RefAttributes<HTMLLabelElement>, "ref"> &
    VariantProps<(props?: ClassProp | undefined) => string> &
    RefAttributes<any>
> = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(
  (
    {
      className,
      ...props
    }: Omit<LabelPrimitive.LabelProps & RefAttributes<HTMLLabelElement>, "ref"> &
      VariantProps<(props?: ClassProp | undefined) => string>,
    ref: ForwardedRef<HTMLLabelElement>
  ): ReactElement => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
