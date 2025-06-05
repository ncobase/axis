import { memo, ReactNode, useCallback } from 'react';

import { Dialog, DialogViewProps } from '@/dialog';

export interface ModalProps<T> extends DialogViewProps {
  title?: string;
  description?: string;
  // eslint-disable-next-line no-unused-vars
  children?: ReactNode | ((record: T | null) => ReactNode) | any;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: any;
  onChange?: () => void;
  onCancel?: () => void;
  record?: T | null;
  isOpen?: boolean;
  className?: string;
  isMaximized?: boolean;
  toolbar?: ReactNode;
  confirmDisabled?: boolean;
  confirmVariant?: string;
  loading?: boolean;
}

export const Modal = memo(
  <T extends object>({
    children,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onChange,
    onCancel,
    record,
    isOpen = false,
    confirmDisabled,
    confirmVariant,
    loading,
    ...rest
  }: ModalProps<T>) => {
    const renderChildren = useCallback(() => {
      return typeof children === 'function' ? children(record) : children;
    }, [children, record]);

    return (
      <Dialog
        isOpen={isOpen}
        title={title}
        onChange={onChange || onCancel}
        onCancel={onCancel}
        cancelText={cancelText}
        onConfirm={confirmText ? () => onConfirm?.(record) : undefined}
        confirmText={confirmText}
        description={description}
        confirmDisabled={confirmDisabled}
        confirmVariant={confirmVariant}
        loading={loading}
        {...rest}
      >
        {renderChildren()}
      </Dialog>
    );
  }
);
