import React, { useEffect, useState } from 'react';

import { cn } from '@ncobase/utils';

import { Button, buttonVariants } from '../button';
import { ScrollView } from '../views';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from './dialog.elements';

export interface DialogViewProps<T = any> {
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Dialog description
   */
  description?: string;
  /**
   * Dialog children elements
   */
  children?: React.ReactNode;
  /**
   * Dialog trigger, it should be a button or a link
   */
  trigger?: React.ReactNode;
  /**
   * Dialog footer, any element
   */
  footer?: React.ReactNode;
  /**
   * Dialog className
   */
  className?: string;
  /**
   * Is dialog open, default is false
   */
  isOpen?: boolean;
  /**
   * Callback when dialog is open or close
   */
  onChange?: (_record?: T) => void;
  /**
   * Cancel button, if footer is not defined it will be displayed
   */
  onCancel?: () => void;
  /**
   * Cancel button text, default is 'Cancel'
   */
  cancelText?: string;
  /**
   * Confirm button, if footer is not defined it will be displayed
   */
  onConfirm?: (_record?: T) => void;
  /**
   * Confirm button text, default is 'Confirm'
   */
  confirmText?: string;
  /**
   * Dialog header toolbar elements
   */
  toolbar?: React.ReactNode;
  /**
   * Whether the confirm button is disabled
   */
  confirmDisabled?: boolean;
  /**
   * Variant of the confirm button
   */
  confirmVariant?: string;
  /**
   * Loading state of the confirm button
   */
  loading?: boolean;
  /**
   * Dialog size, default is 'default'
   */
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'full';
}

export const Dialog = <T,>({
  title,
  description,
  isOpen,
  onChange,
  trigger,
  footer,
  onCancel,
  cancelText,
  onConfirm,
  confirmText,
  className,
  toolbar,
  children,
  confirmDisabled,
  confirmVariant = 'primary',
  loading,
  size = 'default'
}: DialogViewProps<T>) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleChange = () => {
    setOpen(prevStatus => !prevStatus);
    onChange?.();
  };

  const sizeClasses = {
    xs: 'max-w-[30vw] min-w-[240px]',
    sm: 'max-w-[40vw] min-w-[320px]',
    default: 'max-w-[60vw] min-w-[480px]',
    lg: 'max-w-[75vw] min-w-[640px]',
    xl: 'max-w-[90vw] min-w-[800px]',
    full: 'max-w-[calc(100vw-4rem)] min-w-[320px]'
  };

  return (
    <DialogRoot open={open} onOpenChange={handleChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn('min-h-[200px]', 'max-h-[90vh]', sizeClasses[size], className)}>
        {title || description ? (
          <DialogHeader className='-mx-6 px-6'>
            {title && <DialogTitle className='text-base font-medium'>{title}</DialogTitle>}
            <DialogDescription className='whitespace-pre-line'>{description}</DialogDescription>
            {toolbar && (
              <div
                className='absolute top-3 right-12 flex items-center gap-2'
                id='dialog-header-actions'
              >
                {toolbar}
              </div>
            )}
          </DialogHeader>
        ) : null}
        <ScrollView className={cn('flex-1 overflow-auto', !(title || description) ? 'pt-6' : '')}>
          {children}
        </ScrollView>
        {(footer || onCancel || onConfirm) && (
          <DialogFooter className='border-t border-slate-100 pt-6 -mx-6 px-6'>
            {footer}
            {!footer && onCancel && (
              <Button onClick={onCancel} variant='slate'>
                {cancelText || 'Cancel'}
              </Button>
            )}
            {!footer && onConfirm && (
              <button
                onClick={() => onConfirm({} as T)}
                disabled={confirmDisabled || loading}
                className={buttonVariants({ variant: confirmVariant as any })}
              >
                {loading ? 'Loading...' : confirmText || 'Confirm'}
              </button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};
