export type MarkdownPageProps<T = MarkdownFrontmatter> = {
  file: MarkdownFileProps<T>;
  preview?: boolean;
  error?: string;
};

export type MarkdownFileProps<T = MarkdownFrontmatter> = {
  fileRelativePath: string;
  data: {
    frontmatter: T;
    markdownBody: string;
  };
};

export type MarkdownFrontmatter = { [key: string]: any };
