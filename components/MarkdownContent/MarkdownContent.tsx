/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Code from '../../styles/Code';

// TODO: explore async and or light variants of syntaxhighlighter
function WithCodeStyles({ language, value }: any): React.ReactElement {
  return (
    <SyntaxHighlighter language={language} style={Code}>
      {value}
    </SyntaxHighlighter>
  );
}

interface MarkdownContentProps {
  content: string;
  escapeHtml?: boolean; // eq:false --> if the component needs to render html
  skipHtml?: boolean;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, ...rest }: MarkdownContentProps) => (
  <ReactMarkdown
    {...rest}
    source={content}
    renderers={{
      code: WithCodeStyles,
    }}
  />
);
export default MarkdownContent;
