"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";

const Dialog: FC<DialogPrimitive.DialogProps> = DialogPrimitive.Root;

const DialogTrigger: ForwardRefExoticComponent<
  DialogPrimitive.DialogTriggerProps & RefAttributes<HTMLButtonElement>
> = DialogPrimitive.Trigger;

const DialogPortal: FC<DialogPrimitive.DialogPortalProps> = DialogPrimitive.Portal;

const DialogClose: ForwardRefExoticComponent<
  DialogPrimitive.DialogCloseProps & RefAttributes<HTMLButtonElement>
> = DialogPrimitive.Close;

const DialogOverlay: ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogOverlayProps & RefAttributes<HTMLDivElement>, "ref"> &
    RefAttributes<HTMLDivElement>
> = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(
  (
    {
      className,
      ...props
    }: Omit<DialogPrimitive.DialogOverlayProps & RefAttributes<HTMLDivElement>, "ref">,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent: ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogContentProps & RefAttributes<HTMLDivElement>, "ref"> &
    RefAttributes<HTMLDivElement>
> = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(
  (
    {
      className,
      children,
      ...props
    }: Omit<DialogPrimitive.DialogContentProps & RefAttributes<HTMLDivElement>, "ref">,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader: {
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement;
  displayName: string;
} = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter: {
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement;
  displayName: string;
} = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle: ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogTitleProps & RefAttributes<HTMLHeadingElement>, "ref"> &
    RefAttributes<HTMLHeadingElement>
> = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(
  (
    {
      className,
      ...props
    }: Omit<DialogPrimitive.DialogTitleProps & RefAttributes<HTMLHeadingElement>, "ref">,
    ref: ForwardedRef<HTMLHeadingElement>
  ): ReactElement => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: ForwardRefExoticComponent<
  Omit<
    DialogPrimitive.DialogDescriptionProps & RefAttributes<HTMLParagraphElement>,
    "ref"
  > &
    RefAttributes<HTMLParagraphElement>
> = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(
  (
    {
      className,
      ...props
    }: Omit<
      DialogPrimitive.DialogDescriptionProps & RefAttributes<HTMLParagraphElement>,
      "ref"
    >,
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
