import React, { useEffect, useState } from 'react';

import { cn } from '@ncobase/utils';

import { Button } from '../button';
import { Icons } from '../icon';
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

interface DialogViewProps {
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
  onChange?: () => void;
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
  onConfirm?: () => void;
  /**
   * Confirm button text, default is 'Confirm'
   */
  confirmText?: string;
  /**
   * Is dialog maximized, default is false
   */
  isMaximized?: boolean;
}

export const Dialog: React.FC<DialogViewProps> = ({
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
  isMaximized: defaultIsMaximized = false,
  children
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleChange = () => {
    setOpen(prevStatus => !prevStatus);
    onChange?.();
  };

  const [isMaximized, setIsMaximized] = useState(defaultIsMaximized);
  const defaultSize =
    'w-[78lvw] h-[76lvh] max-w-[90lvw] max-h-[86lvh] shadow-lg rounded-lg -translate-x-[50%] -translate-y-[55%]';
  const maximizedSize =
    '!w-[100lvw] !h-[100lvh] max-w-[100lvw] max-h-[100lvh] shadow-none !rounded-none -translate-x-[50%] -translate-y-[50%]';
  const handleMaximize = () => {
    setIsMaximized(prevStatus => !prevStatus);
  };

  return (
    <DialogRoot open={open} onOpenChange={handleChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(className, {
          [maximizedSize]: isMaximized,
          [defaultSize]: !isMaximized
        })}
      >
        {title || description ? (
          <DialogHeader className='-mx-6 px-6'>
            {title && <DialogTitle className='text-base font-medium'>{title}</DialogTitle>}
            {description && (
              <DialogDescription className='whitespace-pre-line'>{description}</DialogDescription>
            )}
            <Button
              variant='unstyle'
              size='ratio'
              className='absolute top-3 right-12 rounded-full p-1 text-default-11 hover:bg-default-1/10 focus:outline-none hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:[&>svg]:stroke-danger-400'
              onClick={handleMaximize}
            >
              <Icons name={isMaximized ? 'IconWindowMinimize' : 'IconWindowMaximize'} size={16} />
            </Button>
          </DialogHeader>
        ) : null}
        <ScrollView className={cn('flex-1', !(title || description) ? 'pt-6' : '')}>
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
              <Button onClick={onConfirm} variant='primary'>
                {confirmText || 'Confirm'}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};
