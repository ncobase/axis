import React from 'react';

import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react';

import { type FloatingMenuProps } from '../types';

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ editor, className = '', children }) => {
  if (!editor) {
    return null;
  }

  const classes = `nco-editor-floating-menu ${className}`;

  return (
    <TiptapFloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className={classes}>
      {children}
    </TiptapFloatingMenu>
  );
};
