import React from 'react';

import { cn } from '@ncobase/utils';
import { Drawer as DrawerPrimitive, type DialogProps as VaulDialogProps } from 'vaul';

export type DrawerProps = VaulDialogProps;
export type DrawerTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};
export type DrawerPortalProps = {
  children?: React.ReactNode;
  container?: HTMLElement | null;
};
export type DrawerCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};
export type DrawerOverlayProps = React.HTMLAttributes<HTMLDivElement>;
export type DrawerContentProps = React.HTMLAttributes<HTMLDivElement>;
export type DrawerTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type DrawerDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const DrawerRootPrimitive = DrawerPrimitive.Root as unknown as React.FC<DrawerProps>;
const DrawerTrigger = DrawerPrimitive.Trigger as unknown as React.FC<DrawerTriggerProps>;
const DrawerPortal = DrawerPrimitive.Portal as unknown as React.FC<DrawerPortalProps>;
const DrawerClose = DrawerPrimitive.Close as unknown as React.FC<DrawerCloseProps>;
const DrawerOverlayPrimitive =
  DrawerPrimitive.Overlay as unknown as React.ForwardRefExoticComponent<
    DrawerOverlayProps & React.RefAttributes<HTMLDivElement>
  >;
const DrawerContentPrimitive =
  DrawerPrimitive.Content as unknown as React.ForwardRefExoticComponent<
    DrawerContentProps & React.RefAttributes<HTMLDivElement>
  >;
const DrawerTitlePrimitive = DrawerPrimitive.Title as unknown as React.ForwardRefExoticComponent<
  DrawerTitleProps & React.RefAttributes<HTMLHeadingElement>
>;
const DrawerDescriptionPrimitive =
  DrawerPrimitive.Description as unknown as React.ForwardRefExoticComponent<
    DrawerDescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerRootPrimitive shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <DrawerOverlayPrimitive
      ref={ref}
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  )
);
DrawerOverlay.displayName = 'DrawerOverlay';

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerContentPrimitive
        ref={ref}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[0.625rem]',
          className
        )}
        {...props}
      >
        <div className='mx-auto mt-4 h-2 w-[6.25rem] rounded-full bg-muted' />
        {children}
      </DrawerContentPrimitive>
    </DrawerPortal>
  )
);
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <DrawerTitlePrimitive
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DrawerDescriptionPrimitive
      ref={ref}
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
);
DrawerDescription.displayName = 'DrawerDescription';

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
};
