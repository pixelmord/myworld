import React from 'react';
import { InlineForm, InlineFormProps } from 'react-tinacms-inline';
import { useGithubToolbarPlugins } from 'react-tinacms-github';

interface Props extends React.PropsWithChildren<InlineFormProps> {
  preview: boolean;
  path: string;
}

export const OpenAuthoringInlineForm: React.FC<Props> = ({ form, preview, children }: Props) => {
  // Toolbar Plugins
  useGithubToolbarPlugins();

  return (
    <InlineForm form={form} initialStatus={typeof document !== 'undefined' && preview ? 'active' : 'inactive'}>
      {children}
    </InlineForm>
  );
};

export default OpenAuthoringInlineForm;
