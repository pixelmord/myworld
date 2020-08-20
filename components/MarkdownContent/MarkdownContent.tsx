/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Code from '../../styles/Code';
import { Checkbox } from 'prestyled';

function getCoreProps(props) {
  return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}
// @see: https://github.com/rexxars/react-markdown/blob/master/src/renderers.js
// TODO: explore async and or light variants of syntaxhighlighter
function WithCodeStyles({ language, value }: { language: string; value: string }): React.ReactElement {
  return (
    <SyntaxHighlighter language={language} style={Code}>
      {value}
    </SyntaxHighlighter>
  );
}

function List(props: { start?: number; ordered: boolean }) {
  const attrs = getCoreProps(props);
  if (props.start !== null && props.start !== 1 && props.start !== undefined) {
    attrs.start = props.start.toString();
  }

  return props.ordered ? <Styled.ol {...attrs} {...props} /> : <Styled.ul {...attrs} {...props} />;
}

function ListItem(props: React.PropsWithChildren<{ checked?: boolean }>) {
  let checkbox = null;
  if (props.checked !== null && props.checked !== undefined) {
    checkbox = <Checkbox {...props} readOnly={true} />;
  }

  return (
    <Styled.li {...getCoreProps(props)}>
      {checkbox}
      {props.children}
    </Styled.li>
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
      list: List,
      listItem: ListItem,
    }}
  />
);
export default MarkdownContent;
