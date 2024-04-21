import React from 'react';

import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeHighlighter = ({ children, ...rest }) => {
  return (
    <SyntaxHighlighter style={atomDark} {...rest} language='javascript'>
      {children}
    </SyntaxHighlighter>
  );
};
