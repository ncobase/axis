import React, { useEffect, useState } from 'react';

import { cn } from '@tone/utils';

import { Button } from '../button';
import { ScrollView } from '../views';

import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot
} from './dialog.elements';

interface DialogViewProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onChange?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  onConfirm?: () => void;
  confirmText?: string;
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
  children
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
    return () => setOpen(false);
  }, [isOpen]);

  const handleChange = () => {
    setOpen(!open);
    if (!open && onChange) onChange();
  };

  return (
    <DialogRoot open={open} onOpenChange={handleChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn(className)}>
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        ) : null}
        <ScrollView className={cn('flex-1', !(title || description) ? 'pt-6' : '')}>
          {children}
        </ScrollView>
        {(footer || onCancel || onConfirm) && (
          <DialogFooter className='border-t border-slate-100 pt-6'>
            {footer}
            {!footer && onCancel && (
              <Button onClick={onCancel} variant='secondary'>
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
